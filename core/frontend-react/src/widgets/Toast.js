import { toast } from "react-toastify";

export const SuccessToast = (message,duration) => {
    toast.success(message, {
        position: "top-right",
        autoClose: duration,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });
}
export const ErrorToast = (message,duration) => {
    toast.error(message, {
        position: "top-right",
        autoClose: duration,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });
}
export const ErrorToastBottom = (message,duration) => {
    toast.error(message, {
        position: "bottom-center",
        autoClose: duration,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });
}