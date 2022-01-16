import Swal from 'sweetalert2';

export default function () {
  return {
    toast: (options) =>
      Swal.mixin({
        toast: true,
        icon: 'success',
        title: 'General Title',
        animation: false,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
      }).fire(options),
  };
}
