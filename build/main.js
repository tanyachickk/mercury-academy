function animate(draw, duration, callback) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
        var timePassed = time - start;
        if (timePassed > duration) timePassed = duration;
        draw(timePassed);
        if (timePassed < duration) {
            requestAnimationFrame(animate);
        } else if (callback) {
            callback();
        }
    });
}

function slideIn(element, distance, duration, displayTo = 'flex') {
    element.style.opacity = 0;
    element.style.display = displayTo;
    animate((timePassed) => {
        const progress = timePassed / duration;
        element.style.opacity = progress;
        element.style.left = `${- distance + distance * progress}px`;
    }, duration);
}

function slideOut(element, distance, duration) {
    animate((timePassed) => {
        const progress = timePassed / duration;
        element.style.opacity = 1 - progress;
        element.style.left = `${distance * progress}px`;
    }, duration, () => { element.style.display = 'none'; });
}
class LoginModule {
    async login({ email, password }) {
        const url = 'https://us-central1-mercdev-academy.cloudfunctions.net/login';
        const requestParams = {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ email, password }),
        };

        const response = await fetch(url, requestParams).catch((error) => 
            Promise.reject({
                message: 'Network error',
                body: error,
            })
        );

        try {
            const parsedData = await response.json();
            if (response.ok) {
                return parsedData;
            }

            if (parsedData && parsedData.error) {
                return Promise.reject({
                    message: parsedData.error,
                    status: response.status,
                    body: parsedData,
                });
            }

            let errorMessage = '';
            if (response.status >= 500) {
                errorMessage = 'Server error. Try again';
            } else if (response.status >= 400 && response.status < 500) {
                errorMessage = 'Application error';
            }

            return Promise.reject({
                message: errorMessage || 'Unhandled error',
                status: response.status,
                body: parsedData,
            });
        } catch(error) {
            return Promise.reject({
                message: 'Invalid server data',
                status: response.status,
                body: error,
            });
        }
    }
}

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
