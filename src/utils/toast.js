import Swal from 'sweetalert2';

export function toast(settings) {
  const darkMode = Boolean(Number(localStorage.getItem('darkMode')));

  let background = '#783F8E',
    color = '#C8C6D7';

  if (darkMode) {
    background = '#263238';
    color = '#FBFBFB';
  }

  return Swal.fire({
    ...settings,
    timer: 2000,
    timerProgressBar: true,
    toast: true,
    position: 'top',
    showConfirmButton: false,
    background,
    color,
  });
}
