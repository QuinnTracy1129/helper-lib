import Swal from 'sweetalert2';

export function toast(settings) {
  const darkMode = Boolean(Number(localStorage.getItem('darkMode'))),
    { light = {}, dark = {} } = JSON.parse(localStorage.getItem('toastSettings') || '{}');

  let background = light.background || '#783F8E',
    color = light.color || '#C8C6D7';

  if (darkMode) {
    background = dark.background || '#263238';
    color = dark.color || '#FBFBFB';
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
