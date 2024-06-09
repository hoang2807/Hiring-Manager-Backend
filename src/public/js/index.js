// Create an instance of Notyf
const notyf = new Notyf({
  position: { x: 'right', y: 'top' },
});

const btn = document.querySelector('.btn');
const password = document.querySelector('.password');
const confirm = document.querySelector('.confirm');
btn.addEventListener('click', (e) => {
  e.preventDefault();
  if (password.value !== confirm.value)
    notyf.error('Nhập lại confirm password');
});
