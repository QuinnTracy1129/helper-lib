import Swal from 'sweetalert2';

export function popUp(func = () => true, options = {}) {
  const { body, confirmButtonText, config } = options;

  const swalWithBootstrapButtons = Swal.mixin(config);

  swalWithBootstrapButtons
    .fire({
      customClass: {
        customClass: {
          actions: 'flex gap-x-5',
          confirmButton: 'btn btn-primary w-40',
          cancelButton: 'btn btn-ghost w-40',
        },
        buttonsStyling: false,
      },
      title: '<strong>Are you sure?</strong>',
      icon: 'question',
      html: `
        <p className="py-4">${body}</p>
  `,
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      reverseButtons: true,
      confirmButtonText: `
    ${confirmButtonText} 
  `,
      cancelButtonText: `
    Cancel 
  `,
    })
    .then(({ isConfirmed }) => {
      if (isConfirmed) func();
    });
}
