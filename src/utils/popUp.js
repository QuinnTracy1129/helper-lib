import Swal from 'sweetalert2';

export function popUp(func = () => true, options = {}) {
  const { body, confirmButtonText } = options;
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-primary w-1/2',
      cancelButton: 'btn btn-ghost w-full',
    },
    buttonsStyling: false,
  });
  swalWithBootstrapButtons
    .fire({
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
    <button class=">${confirmButtonText}</button> 
  `,
      cancelButtonText: `
    <button class="">Cancel</button> 
  `,
    })
    .then(({ isConfirmed }) => {
      if (isConfirmed) func();
    });
}
