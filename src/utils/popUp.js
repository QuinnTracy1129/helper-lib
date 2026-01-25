import Swal from 'sweetalert2';

export function popUp(func = () => true, options = {}) {
  const { body, confirmButtonText } = options;
  Swal.fire({
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
    <button class="btn btn-primary w-1/2">${confirmButtonText}</button> 
  `,
    cancelButtonText: `
    <button class="btn btn-ghost w-full">Cancel</button> 
  `,
  }).then(({ isConfirmed }) => {
    if (isConfirmed) func();
  });
}
