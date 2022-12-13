import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAtqQLUSgnS7BvK_OQ-qHi6kJ5G9MTZXug",
    authDomain: "fir-v9-641f6.firebaseapp.com",
    projectId: "fir-v9-641f6",
    storageBucket: "fir-v9-641f6.appspot.com",
    messagingSenderId: "256569956585",
    appId: "1:256569956585:web:9ba1152282d22d84ec3878"
  };

// init firebase app
initializeApp(firebaseConfig)

//init service
export const db = getFirestore()

//collectiaon ref
const colRef = collection(db, 'books')

//export DB
export default colRef

