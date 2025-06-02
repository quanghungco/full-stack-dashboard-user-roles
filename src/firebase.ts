import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB92ObxhiKYXY7kUxJIa_rJ-zh31An3mlw",
  authDomain: "schmeg-e4eb0.firebaseapp.com",
  projectId: "schmeg-e4eb0",
  storageBucket: "schmeg-e4eb0.appspot.com",
  messagingSenderId: "736464640060",
  appId: "1:736464640060:web:e990bd163e6ef67d448b39",
  measurementId: "G-PEG0LC9P6F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };