const socket = io('https://<your-vercel-app-name>.vercel.app');

socket.on('adminData', (data) => {
    document.getElementById('userCount').innerText = `تعداد کاربران: ${data.userCount}`;
    
    const callLogs = document.getElementById('callLogs');
    callLogs.innerHTML = '';
    data.callLogs.forEach(log => {
        const li = document.createElement('li');
        li.innerText = `از ${log.from} به ${log.to} - زمان: ${log.time}`;
        callLogs.appendChild(li);
    });
    
    const activeCalls = document.getElementById('activeCalls');
    activeCalls.innerHTML = '';
    data.activeCalls.forEach(call => {
        const li = document.createElement('li');
        li.innerText = `بین ${call.from} و ${call.to}`;
        activeCalls.appendChild(li);
    });
});

socket.emit('requestAdminData');
