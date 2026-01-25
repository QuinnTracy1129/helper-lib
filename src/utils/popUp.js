import Swal from 'sweetalert2';

export function popUp(func = () => true, options = {}) {
  const {
    title = 'Are you sure?',
    body,
    confirmButtonText,
    cancelButtonText = 'Cancel',
    icon = 'question',
  } = options;

  Swal.fire({
    customClass: {
      actions: 'flex gap-x-5',
      confirmButton: 'btn btn-primary w-40',
      cancelButton: 'btn btn-ghost w-40',
    },
    buttonsStyling: false,
    title: `<strong>${title}</strong>`,
    icon,
    html: `<p className="py-4">${body}</p>`,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: true,
    reverseButtons: true,
    confirmButtonText,
    cancelButtonText,
  }).then(({ isConfirmed }) => {
    if (isConfirmed) func();
  });
}
