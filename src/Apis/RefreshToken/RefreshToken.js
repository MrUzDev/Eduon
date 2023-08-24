import axios from "axios";

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
        });
    }
  } catch (error) {}
};