importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyD5cJxWazH__1hgQY7f7Ysj6FOcVTdZVaY",
  authDomain: "fir-app-89b1c.firebaseapp.com",
  projectId: "fir-app-89b1c",
  storageBucket: "fir-app-89b1c.firebasestorage.app",
  messagingSenderId: "620337207590",
  appId: "1:620337207590:web:68b94bc660ee39482149e7",
  measurementId: "G-7X90G2LYNR"
});


const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message: ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});