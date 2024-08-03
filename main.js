const user = JSON.parse(localStorage.getItem('user'));

document.getElementById('userInfo').innerText = `نام: ${user.name}, نام کاربری: ${user.username}, آیدی: ${user.id}`;

const socket = io('https://<your-vercel-app-name>.vercel.app');

socket.emit('userOnline', user);

socket.on('onlineUsers', (users) => {
    const onlineUsersList = document.getElementById('onlineUsers');
    onlineUsersList.innerHTML = '';
    users.forEach((u) => {
        const li = document.createElement('li');
        li.innerText = `نام کاربری: ${u.username}, آیدی: ${u.id}`;
        onlineUsersList.appendChild(li);
    });
});

document.getElementById('callForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const callId = document.getElementById('callId').value;
    socket.emit('callUser', { from: user.id, to: callId });
});

document.getElementById('randomCall').addEventListener('click', function() {
    socket.emit('randomCall', user.id);
});

socket.on('receiveCall', (fromUser) => {
    const acceptCall = confirm(`تماس از ${fromUser.username} (${fromUser.id}) را قبول می‌کنید؟`);
    if (acceptCall) {
        socket.emit('acceptCall', { from: fromUser.id, to: user.id });
        startCall(fromUser.id);
    }
});

socket.on('callAccepted', (toUser) => {
    startCall(toUser.id);
});

function startCall(otherUserId) {
    // اینجا کد WebRTC را برای برقراری تماس اضافه کنید
    console.log('شروع تماس با کاربر:', otherUserId);
}
