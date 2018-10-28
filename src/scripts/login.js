const LoginModule = (() => {
    const isLoggedIn = false;

    const handleResponse = (response) =>
        response.json().then((json) => {
            if (!response.ok) {
                const error = Object.assign({}, json, {
                    status: response.status,
                    statusText: response.statusText,
                });
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
