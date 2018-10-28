const LoginModule = (() => {
    const isLoggedIn = false;

    const handleResponse = (response) =>
        response.json().then((json) => {
            if (!response.ok) {
                const error = { ...json, status: response.status };
                return Promise.reject(error);
            }
            return json;
        });
    

    return {
        login: ({ email, password }) => {
            const url = 'https://us-central1-mercdev-academy.cloudfunctions.net/login';
            const requestParams = {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ email, password }),
            };
            return fetch(url, requestParams).then(handleResponse);
        },
        logout: () => {
            console.log('logout');
        },
    };
})();

const INPUT_ERROR_CLASS = 'login-form__input_error';

const [ loginForm, logoutForm ] = document.getElementsByTagName('form');
const [ emailInput, passwordInput ] = document.getElementsByTagName('input');
const [ loginButton, logoutButton ] = document.getElementsByTagName('button');

const errorAlert = document.getElementsByClassName('login-form__error')[0];
const avatarElement = document.getElementsByClassName('logout-form__avatar')[0];
const usernameElement = document.getElementsByClassName('logout-form__username')[0];

function login(event) {
    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
        return false;
    }
    event.preventDefault();

    LoginModule.login({ email, password })
        .then((res) => onSuccessLogin(res))
        .catch((error) => onErrorLogin(error));
}

function logout(event) {
    event.preventDefault();

    emailInput.value = '';
    passwordInput.value = '';

    logoutForm.style.display = 'none';
    loginForm.style.display = 'flex';
}

function onSuccessLogin({ name, photoUrl }) {
    usernameElement.innerText = name;
    avatarElement.src = photoUrl;

    loginForm.style.display = 'none';
    logoutForm.style.display = 'flex';
}

function onErrorLogin({ error }) {
    errorAlert.innerText = error;
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