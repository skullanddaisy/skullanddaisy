﻿import firebase from 'firebase';
import axios from 'axios';

axios.interceptors.request.use(function (request) {
    const token = sessionStorage.getItem('token');

    if (token != null) {
        request.headers.Authorization = `Bearer ${token}`;
    }

    return request;
}, function (err) {
    return Promise.reject(err);
});

axios.interceptors.response.use(response => {
    return response;
}, errorResponse => {
    console.error("Blew up")
});

const registerUser = (user) => {
    return firebase.auth().createUserWithEmailAndPassword(user.email, user.password);
};

const loginUser = (user) => {
    return firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(cred => {
        getCurrentUserJwt();
    });
};

const logoutUser = () => {
    return firebase.auth().signOut();
};

const getUid = () => {
    return firebase.auth().currentUser.uid;
};

const getCurrentUserJwt = () => firebase
    .auth()
    .currentUser.getIdToken()
    .then(token => sessionStorage.setItem('token', token));

export default {
    getUid,
    loginUser,
    logoutUser,
    registerUser,
    getCurrentUserJwt
};