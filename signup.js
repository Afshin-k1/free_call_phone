document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const id = Math.floor(Math.random() * 90000) + 10000; // آیدی ۵ رقمی تصادفی

    // ذخیره اطلاعات کاربر
    localStorage.setItem('user', JSON.stringify({ name, username, id }));

    // انتقال به صفحه اصلی
    window.location.href = 'main.html';
});
