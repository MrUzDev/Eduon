import axios from "axios";
import { gapi } from "gapi-script";

export const refresh = (code, statusText) => {
  try {
    if (code == 401 || statusText === "Unauthorized") {
      axios
      .post(`${process.env.REACT_APP_API_KEY}/api/v1/token/refresh/`, {
        refresh: localStorage.getItem("refresh"),
      })
      .then((res) => {
        console.log(res.data.access);
        localStorage.removeItem("access");
        localStorage.setItem("access", res.data.access);
        window.location.reload();
      })
        .catch((err) => {
          console.log(err);
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");

          var auth2 = gapi.auth2.getAuthInstance();
          auth2.signOut().then(function() {
            window.location.reload();
          });
        });
    }
  } catch (error) {}
};