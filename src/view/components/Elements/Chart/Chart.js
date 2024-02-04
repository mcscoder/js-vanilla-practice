import { roundToNearest } from "@/utils";

export const CHART_TYPES = {
  WEEKLY: "1",
  MONTHLY: "2",
  YEARLY: "3",
};

export const chartXSegments = {
  [CHART_TYPES.WEEKLY]: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  [CHART_TYPES.MONTHLY]: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
};

export const getXSegment = (chartType, index) => {
  if (chartType === CHART_TYPES.YEARLY) {
    const currentYear = new Date().getFullYear();
    return currentYear - index;
  }

  const currentIndex =
    chartType === CHART_TYPES.WEEKLY
      ? new Date().getDay()
      : new Date().getMonth();
  const xSegments = chartXSegments[chartType];
  index = currentIndex - index;
  if (index < 0) {
    index = xSegments.length + index;
  }
  return xSegments[index];
};

export class Chart {
  static WeeklyChart(data = [], width = 680, height = 250) {
    return Chart.InitChart(data, CHART_TYPES.WEEKLY, width, height);
  }

  static MonthlyChart(data = [], width = 680, height = 250) {
    return Chart.InitChart(data, CHART_TYPES.MONTHLY, width, height);
  }

  static YearlyChart(data = [], width = 680, height = 250) {
    return Chart.InitChart(data, CHART_TYPES.YEARLY, width, height);
  }

  static InitChart(array = [], chartType, width = 680, height = 250) {
    const padding = 8;
    const [GRAPH_WIDTH, GRAPH_HEIGHT] = [
      width - padding * 2,
      height - padding * 2,
    ];
    const [LEFT, RIGHT] = [padding, GRAPH_WIDTH + padding];
    const [TOP, BOTTOM] = [padding, GRAPH_HEIGHT + padding];

    // xSegments: segments of x-axis (ex: months of a year)
    // ySegments: segments of y-axis (ex: total value of each month)
    const [xSegments, ySegments] = [array.length, 4];

    // find the top value of y-axis
    const largestValue = roundToNearest(Math.max(...array));

    const canvas = document.createElement("canvas");
    canvas.className = "chart";
    canvas.width = RIGHT + padding;
    canvas.height = BOTTOM + padding;

    const ctx = canvas.getContext("2d");

    // text segment area
    const TEXT_AREA = {
      x: {
        start: LEFT,
        end: LEFT + 85,
      },
      y: {
        start: BOTTOM - 35,
        end: BOTTOM,
      },
    };

    // real graph area
    const DRAW_AREA = {
      x: {
        start: TEXT_AREA.x.end,
        end: RIGHT,
      },
      y: {
        start: TOP,
        end: TEXT_AREA.y.start,
      },
      padding: 54,
    };

    // draw left and bottom borders
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#E6E6E6";
    ctx.beginPath();
    ctx.moveTo(DRAW_AREA.x.start, DRAW_AREA.y.start); // top left
    ctx.lineTo(DRAW_AREA.x.start, DRAW_AREA.y.end); // bottom left
    ctx.moveTo(DRAW_AREA.x.start, DRAW_AREA.y.end); // bottom left
    ctx.lineTo(DRAW_AREA.x.end, DRAW_AREA.y.end); // bottom right
    ctx.stroke();

    // draw row line segments
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = 0; i < ySegments; i++) {
      const xStart = DRAW_AREA.x.start;
      const xEnd = DRAW_AREA.x.end;
      // y = [top separator] + [y-axis draw area length] * [current segment order] / [number of segments]
      // it's mean: y = position of segment on y-axis
      const y =
        DRAW_AREA.y.start +
        ((DRAW_AREA.y.end - DRAW_AREA.y.start) * i) / ySegments;
      ctx.moveTo(xStart, y);
      ctx.lineTo(xEnd, y);
    }
    ctx.stroke();

    // draw y data
    ctx.fillStyle = "#8e8e8e";
    ctx.font = "600 1rem Rubik";
    ctx.beginPath();
    for (let i = 0; i < ySegments; i++) {
      // y = [top separator] + [y-axis draw area length] * [current segment order] / [number of segments]
      // it's mean: y = position of segment on y-axis
      const y =
        DRAW_AREA.y.start +
        ((DRAW_AREA.y.end - DRAW_AREA.y.start) * i) / ySegments;

      // example: largest value = 400 and there are 4 segments
      /** y-axis segments will be
       * 400
       * 300
       * 200
       * 100
       */
      const segmentData = largestValue - (largestValue * i) / ySegments;
      ctx.fillText(
        `$${segmentData}`,
        TEXT_AREA.x.start,
        y + 8 // center text to row line
      );
    }
    ctx.stroke();

    // draw x-axis data
    ctx.fillStyle = "#212121";

    // max width of graph
    // purpose: prevent data overflow of the graph, or the last segment can be overflow out of the border bottom
    // so -DRAW_AREA.padding to guarantee that never be overflow (except the text data too long)
    const xDataWidth =
      DRAW_AREA.x.end - DRAW_AREA.x.start - DRAW_AREA.padding * 2;
    ctx.beginPath();
    for (let i = 0; i < xSegments; i++) {
      const x =
        DRAW_AREA.x.start +
        DRAW_AREA.padding +
        (xDataWidth * i) / (xSegments - 1);
      const y = TEXT_AREA.y.end;
      ctx.fillText(getXSegment(chartType, xSegments - i - 1), x - 16, y);
    }
    ctx.stroke();

    // draw graph
    ctx.strokeStyle = "#1B59F8";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < xSegments; i++) {
      const x =
        DRAW_AREA.x.start +
        DRAW_AREA.padding +
        (xDataWidth * i) / (xSegments - 1);
      const yAxisLength = DRAW_AREA.y.end - DRAW_AREA.y.start;
      // y = [y-axis length] - [ratio between segment value and largest value] * [y-axis length]
      // example: y-axis length = 100, segment value = 300, largest value = 400,
      /** y position index will be
       *  y = 100 - ((300 / 400) * 100) = 100 - (0.75 * 100) = 100 - 75 = 25
       *
       *  this segment will be placed at y = 25 with largest segment placed at y = 0
       */
      const y =
        DRAW_AREA.y.start +
        yAxisLength -
        (array[i] / largestValue) * yAxisLength;
      ctx.lineTo(x, y);
      ctx.moveTo(x, y);
    }
    ctx.stroke();

    return canvas;
  }
}
