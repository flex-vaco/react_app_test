import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import * as auth from "../../app/modules/auth";

export default function setupAxios(axios: any, store: any) {
  const { dispatch } = store;
  axios.interceptors.request.use(
    (config: any) => {
      const {
        auth: { accessToken },
      } = store.getState();
      // const local_user = localStorage.getItem("user");
      // const user = JSON.parse(local_user || "{}");
      // const accessToken = user?.auth?.accessToken
      console.log("Interceptors");
      console.log(accessToken);
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
        config.xhrFields = true;
        config.crossDomain = true;
      } else {
        console.log("No token-----", accessToken);
      }

      return config;
    },
    (err: any) => Promise.reject(err)
  );

  // Response interceptor for API calls
  axios.interceptors.response.use(
    (response: any) => {
      return response;
    },
    async (error: any) => {
      const errCode = error.response.status;
      if (errCode == "401") {
        let errTitle = "AUTHENTICATION FAILED!";
        let errMessage = "Try Logging-in again.";

        const { value: isConfirmed } = await Swal.fire({
          title: errTitle,
          html: `${error} <br /> ${errMessage}`,
          confirmButtonColor: "#0e4372",
          showConfirmButton: true,
        });
        if (isConfirmed) {
          // localStorage.removeItem("user");
          dispatch(auth.actions.logout());
          document.location.reload();
          //window.location.reload();
        }
      }
    }
  );
}
