const INPUT_ERROR_CLASS = 'login-form__input_error';

const [ loginForm, logoutForm ] = document.getElementsByTagName('form');
const [ emailInput, passwordInput ] = document.getElementsByTagName('input');
const [ loginButton, logoutButton ] = document.getElementsByTagName('button');

const loginLoader = document.getElementsByClassName('login-form__loader')[0];
const errorAlert = document.getElementsByClassName('login-form__error')[0];
const avatarElement = document.getElementsByClassName('logout-form__avatar')[0];
const usernameElement = document.getElementsByClassName('logout-form__username')[0];

async function login(event) {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        return false;
    }
    event.preventDefault();

    const AuthService = new LoginModule();
    try {
        loginLoader.style.display = 'block';
        const data = await AuthService.login({ email, password });
        loginLoader.style.display = 'none';
        onSuccessLogin(data);
    } catch (error) {
        loginLoader.style.display = 'none';
        onErrorLogin(error);
    }
}

function logout(event) {
    event.preventDefault();

    emailInput.value = '';
    passwordInput.value = '';

    slideOut(logoutForm, 50, 200);
    setTimeout(() => {
        slideIn(loginForm, 200, 500);
    }, 200);
    
}

function onSuccessLogin({ name, photoUrl }) {
    usernameElement.innerText = name;
    avatarElement.src = photoUrl;

    slideOut(loginForm, 50, 200);
    setTimeout(() => {
        slideIn(logoutForm, 200, 500);
    }, 200);
}

function onErrorLogin({ message }) {
    errorAlert.innerText = message;
    errorAlert.style.display = 'block';
    passwordInput.value = '';
    emailInput.classList.add(INPUT_ERROR_CLASS);
}

loginButton.addEventListener('click', login);

logoutButton.addEventListener('click', logout);

emailInput.addEventListener('input', (event) => {
    const value = event.target.value;
    if (value && emailInput.classList.contains(INPUT_ERROR_CLASS)) {
        emailInput.classList.remove(INPUT_ERROR_CLASS);
        errorAlert.style.display = 'none';
    } else if (!value) {
        emailInput.classList.add(INPUT_ERROR_CLASS);
    }
});

passwordInput.addEventListener('input', () => {
    if (emailInput.classList.contains(INPUT_ERROR_CLASS)) {
        emailInput.classList.remove(INPUT_ERROR_CLASS);
        errorAlert.style.display = 'none';
    }
});

window.onload = () => {
    slideIn(loginForm, 200, 500);
}
