'use strict';

var xhr = new XMLHttpRequest();

var json = JSON.stringify({
    email: "user@example.com",
    password: "mercdev"
});

xhr.open("POST", 'https://us-central1-mercdev-academy.cloudfunctions.net/login', true)
xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

xhr.onreadystatechange = function({ currentTarget }) {
    console.log(currentTarget.response);
}

xhr.send(json);