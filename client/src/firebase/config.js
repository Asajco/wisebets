// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import firebase from 'firebase/compat/app'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const app = firebase.initializeApp({
  apiKey: 'AIzaSyAyAGZutSWwgRWRthCz4-eZZGLyw9t4rBQ',
  authDomain: 'wisebets-8cb22.firebaseapp.com',
  projectId: 'wisebets-8cb22',
  storageBucket: 'wisebets-8cb22.appspot.com',
  messagingSenderId: '466299904799',
  appId: '1:466299904799:web:e2c97bde58754493b9862a',
})

// Initialize Firebase
export const db = getFirestore(app)
export default app
