const LoginModule = (() => {
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
