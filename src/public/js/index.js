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

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  fetch(`http://localhost:3000/api/auth-user/forget`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, password: password.value }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (!data.data) notyf.error('Link hết hạn');
      else if (data.status) notyf.success('Cập nhật thành công');
      else notyf.error('Có lỗi xảy ra');
    })
    .catch((error) => notyf.error(error.message));
});
