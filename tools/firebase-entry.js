// Only the pieces the app uses, bundled into vendor/firebase.js so the app starts offline without CDNs.
export { initializeApp } from 'firebase/app';
export {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword,
  sendPasswordResetEmail, signOut
} from 'firebase/auth';
export {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
  collection, doc, setDoc, deleteDoc, onSnapshot, writeBatch
} from 'firebase/firestore';
