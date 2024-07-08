import Swal from "sweetalert2";

export const SuccessToast = (details) => {
  Swal.fire({
    title: "Success!",
    text: details,
    icon: "success",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
};
