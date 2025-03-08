// Your Firebase configuration
const firebaseConfig = {
    // Replace with your Firebase config
    apiKey: "YOUR_API_KEY",
    authDomain: "your-app.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-app.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();

// Collection references
const newsCollection = db.collection('news');
const eventsCollection = db.collection('events');
const galleryCollection = db.collection('gallery');
const noticesCollection = db.collection('notices'); 