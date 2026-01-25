import Swal from 'sweetalert2';

export function popUp(func = () => true, options = {}) {
  const { body, confirmButtonText, config } = options;

  const swalWithBootstrapButtons = Swal.mixin(config);

  swalWithBootstrapButtons
    .fire({
      title: '<strong>Are you sure?</strong>',
      icon: 'question',
      width: '150px',
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
