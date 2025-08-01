import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2tY9GF4zj4lP83fzQMuLmWQcsxJ4L20M",
  authDomain: "test-blog-5a594.firebaseapp.com",
  projectId: "test-blog-5a594",
  storageBucket: "test-blog-5a594.firebasestorage.app",
  messagingSenderId: "1088837579846",
  appId: "1:1088837579846:web:84dc5e6baea57c79a0c647",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
