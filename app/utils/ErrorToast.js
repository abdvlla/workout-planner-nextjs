import Swal from "sweetalert2";

export const ErrorToast = (details) => {
  Swal.fire({
    title: "Error!",
    text: details,
    icon: "error",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
};
