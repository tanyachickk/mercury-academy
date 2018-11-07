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
