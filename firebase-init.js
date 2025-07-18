
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyA2sRaadsBblfOL7HvtR69gJ6AfWQCGv7E",
    authDomain: "mojamind-ffec3.firebaseapp.com",
    projectId: "mojamind-ffec3",
    storageBucket: "mojamind-ffec3.firebasestorage.app",
    messagingSenderId: "71539429309",
    appId: "1:71539429309:web:2bc6653446c4244a0c4cd4",
    measurementId: "G-NX1EEJEDFH"
  };


  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

