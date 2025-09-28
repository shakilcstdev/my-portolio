// src/Firebase/firebase.init.js

// ১. প্রয়োজনীয় ফাংশনগুলো ইম্পোর্ট করুন (getAuth সহ)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // <-- এই লাইনটি যোগ করা হয়েছে

// Your web app's Firebase configuration
const firebaseConfig = {
    // **দ্রষ্টব্য:** এখানে আপনার API Key-টি নিশ্চিত করুন যে এটি Firebase Console থেকে কপি করা সঠিক কী (API Key)
    apiKey: "AIzaSyA9oz5KclTDfmNmlYlZXl5cRImEmponaV0", 
    authDomain: "my-portolio-c220c.firebaseapp.com",
    projectId: "my-portolio-c220c",
    storageBucket: "my-portolio-c220c.firebasestorage.app",
    messagingSenderId: "664340706154",
    appId: "1:664340706154:web:41d82147faf57b25a66b13"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ২. Auth সার্ভিস ইনিশিয়ালাইজ করুন
const auth = getAuth(app); // <-- এই লাইনটি যোগ করা হয়েছে

// ৩. Auth সার্ভিসটিকে 'Named Export' হিসেবে এক্সপোর্ট করুন
export { auth }; // <-- এই লাইনটি যোগ করা হয়েছে, যা আপনার AuthProvider.jsx এ { auth } ইম্পোর্ট করার জন্য দরকার।