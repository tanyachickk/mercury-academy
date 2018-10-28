LoginModule.login({ email: 'user@example.com', password: 'mercdev2' })
    .then((res) => console.log(res))
    .catch((err) => console.log('err', err));