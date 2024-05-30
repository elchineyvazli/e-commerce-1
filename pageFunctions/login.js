const loginSide = document.getElementById('loginSide');
const registerSide = document.getElementById('registerSide');
const signUpText = document.getElementById('signUpText');
const signInText = document.getElementById('signInText');

const registerUserInput = document.getElementById('registerUserInput');
const registerPassInput = document.getElementById('registerPassInput');
const registerPassRepInput = document.getElementById('registerPassRepInput');
const registerEmailInput = document.getElementById('registerEmailInput');
const registerButton = document.getElementById('registerButton');

const loginPassInput = document.getElementById('loginPassInput');
const loginUserInput = document.getElementById('loginUserInput');
const loginButton = document.getElementById('loginButton');

const style = document.createElement('style');
document.head.appendChild(style);

const hidePassLogin = document.getElementsByClassName('hidePassLogin')[0];
const hidePassRegister = document.getElementsByClassName('hidePassRegister')[0];
const required = document.getElementsByClassName('required');
let isHideLoginPass = false;
let isHideRegisterPass = false;

if (localStorage.getItem('loginPage') == "login") {
    loginSide.style.display = "flex";
    registerSide.style.display = "none";
}
if (localStorage.getItem('loginPage') == "register") {
    registerSide.style.display = "flex";
    loginSide.style.display = "none";
}

function hidePassLoginFunc() {
    if (!isHideLoginPass) {
        hidePassLogin.classList = "fa-regular hidePassLogin fa-eye";
        loginPassInput.type = "text";
    } else {
        hidePassLogin.classList = "fa-regular hidePassLogin fa-eye-slash";
        loginPassInput.type = "password";
    }
    isHideLoginPass = !isHideLoginPass;
}

function hidePassRegisterFunc() {
    if (!isHideRegisterPass) {
        hidePassRegister.classList = "fa-regular hidePassRegister fa-eye";
        registerPassInput.type = "text";
        registerPassRepInput.type = "text";
    } else {
        hidePassRegister.classList = "fa-regular hidePassRegister fa-eye-slash";
        registerPassInput.type = "password";
        registerPassRepInput.type = "password";
    }
    isHideRegisterPass = !isHideRegisterPass;
}

function handleSignUpClick() {
    loginSide.style.display = "none";
    registerSide.style.display = "flex";
}

function handleSignInClick() {
    loginSide.style.display = "flex";
    registerSide.style.display = "none";
}

function registerButtonFunc(e) {
    e.preventDefault()
    // async function postData(url = "", data = {}) {
    //     const response = await fetch(url, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data)
    //     })
    //     return response.json();
    // }
    // postData("http://localhost:3000/users", {
    //     username: registerUserInput.value,
    //     fullname: "Fullname",
    //     email: registerEmailInput.value,
    //     number: "",
    //     password: registerPassInput.value,
    //     desc: "",
    //     gender: "",

    // }
    // ).then((data) => {
    //     console.log(data);
    // })
    fetch('http://localhost:3000/users/1')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let updatedData = JSON.parse(JSON.stringify(data));
            updatedData.obj.arr.push({ username: registerUserInput.value, password: registerPassInput.value });
            // localStorage.setItem('key', JSON.stringify(updatedData));
            fetch('http://localhost:3000/users/1', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            })
                .then(response => response.json())
                .then(updatedData => {
                    // localStorage.setItem('key1', JSON.stringify(updatedData))
                })
                .catch(error => console.error('Hata:', error));
        })
        .catch(error => console.error('Hata:', error));


}

function loginButtonFunc() {
    if (
        loginUserInput.value.length > 0
        &&
        loginPassInput.value.length > 5
    ) {
        fetch("../data/data.json")
            .then(res => res.json())
            .then(data => {
                for (let i = 0; i < data.users.length; i++) {
                    if (
                        data.users[i].username == loginUserInput.value
                        &&
                        data.users[i].password == loginPassInput.value
                    ) {
                        localStorage.setItem('userId', data.users[i].id)
                        window.location.href = "../index.html";
                    } else {
                        if (data.users[i].username != loginUserInput.value) {
                            required[0].innerText = "Username not found";
                            required[0].style.marginLeft = "5px";
                            setTimeout(() => {
                                required[0].innerText = "*";
                                required[0].style.marginLeft = 0;
                            }, 1000);
                        } else {
                            required[1].innerText = "Password is uncorrect";
                            setTimeout(() => {
                                required[1].innerText = "*";
                                required[1].style.marginLeft = 0;
                            }, 1000);
                        }
                    }
                }
            })
            .catch(err => console.error(err))
    } else {
        required[1].innerText = "Password field must at least 6 length";
        required[1].style.marginLeft = "5px";
        setTimeout(() => {
            required[1].innerText = "*";
            required[1].style.marginLeft = 0;
        }, 1000);
    }
}
signUpText.children[0].addEventListener('click', handleSignUpClick);
signInText.children[0].addEventListener('click', handleSignInClick);
hidePassLogin.addEventListener('click', hidePassLoginFunc);
hidePassRegister.addEventListener('click', hidePassRegisterFunc);
registerButton.addEventListener('click', registerButtonFunc)
loginButton.addEventListener('click', loginButtonFunc);
