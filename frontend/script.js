const username = document.getElementById('username');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', async () => {

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({
            username: username.value,
            password: password.value,
            email: email.value
        })
    });

    const data = await response.json();

    console.log(data);
});