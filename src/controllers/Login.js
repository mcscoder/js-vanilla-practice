import { Admin } from "@/model/dto"; // eslint-disable-line no-unused-vars
import { Router } from "@/routes";
import { apiEndpoint } from "@/utils";

export class LoginController {
  /**
   * @callback resultCallBack
   * @param {boolean} isAuthenticated
   * @return {void}
   */
  /**
   *
   * @param {Admin} admin
   * @param {object} options
   * @param {boolean} options.isKeepLogged
   * @param {boolean} options.autoNavigate
   * @param {string} options.navigateTo
   * @param {boolean} options.isAlert
   * @param {resultCallBack} options.result
   */
  static authentication(
    admin,
    {
      isKeepLogged = false,
      autoNavigate = true,
      navigateTo = "/",
      isAlert = true,
      result = (isAuthenticated) => {
        isAuthenticated;
      },
    }
  ) {
    fetch(apiEndpoint.adminAuthentication(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin.getAuthenticationBody()),
    })
      .then((res) => {
        if (res.ok) {
          // if admin is authenticated ?
          // continue promise chain
          return res.json();
        } else {
          // if admin authentication is fail ?
          // throw an error with message from server
          return res.json().then((data) => {
            throw new Error(data.message);
          });
        }
      })
      .then((data) => {
        if (isKeepLogged) {
          // write admin data to local storage if keep logged was specified
          // because that would not be auto removed
          localStorage.setItem("admin", JSON.stringify(data));
        } else {
          // else write data to session storage if keep logged was not specified
          // because that would be removed when current tab was closed
          sessionStorage.setItem("admin", JSON.stringify(data));
        }

        // dispatch a custom event
        window.dispatchEvent(new CustomEvent("logging"));

        if (autoNavigate) {
          Router.pushState(navigateTo);
        }

        // trigger callback with true value, cause authenticating was successful
        result(true);
      })
      .catch((message) => {
        if (isAlert) {
          alert(message);
        }
        // trigger callback with true value, cause authenticating was failed
        result(false);

        // remove user data when authentication is failed
        localStorage.removeItem("admin");
        sessionStorage.removeItem("admin");
      });
  }
  /**
   *
   * @param {Admin} admin
   */
  static register(admin) {
    fetch(apiEndpoint.register(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(admin.getRegisterBody()),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            throw new Error(data.message);
          });
        }
      })
      .then(() => {
        alert("Register success");
        Router.pushState("/login");
      })
      .catch((error) => {
        alert(error);
      });
  }
}
