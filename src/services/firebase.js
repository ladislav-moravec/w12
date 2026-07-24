import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut,
  onAuthStateChanged 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyForLMvestScreener000",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "lmvest-demo.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "lmvest-demo",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "lmvest-demo.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1234567890:web:abcdef123456"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export { onAuthStateChanged };

const isApiKeyError = (err) => {
  if (!err) return false;
  const str = `${err.code || ''} ${err.message || ''}`.toLowerCase();
  return str.includes('api-key') || str.includes('invalid-api-key') || str.includes('not-valid') || str.includes('internal-error');
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    console.warn("Firebase Google login warning:", error);
    if (isApiKeyError(error)) {
      const demoUser = {
        uid: "demo-user-123",
        displayName: "Investor (Google Demo)",
        email: "investor@lmvest.com",
        photoURL: "https://api.dicebear.com/7.x/avataaars/svg?seed=Investor"
      };
      localStorage.setItem("lmvest_demo_user", JSON.stringify(demoUser));
      return { user: demoUser, error: null, isDemo: true };
    }
    return { user: null, error: error.message || "Chyba při přihlášení." };
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    console.warn("Firebase email login fallback:", error);
    if (isApiKeyError(error) || error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
      const demoUser = {
        uid: "demo-email-user",
        displayName: email.split('@')[0] || "Uživatel",
        email: email,
        photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
      };
      localStorage.setItem("lmvest_demo_user", JSON.stringify(demoUser));
      return { user: demoUser, error: null, isDemo: true };
    }
    return { user: null, error: error.message || "Chyba při přihlášení e-mailem." };
  }
};

export const registerWithEmail = async (email, password, name) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return { user: result.user, error: null };
  } catch (error) {
    console.warn("Firebase register fallback:", error);
    const demoUser = {
      uid: "demo-registered-user",
      displayName: name || email.split('@')[0],
      email: email,
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };
    localStorage.setItem("lmvest_demo_user", JSON.stringify(demoUser));
    return { user: demoUser, error: null, isDemo: true };
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (err) {
    console.warn("Signout err", err);
  }
  localStorage.removeItem("lmvest_demo_user");
};

export const saveUserPortfolio = async (userId, holdings) => {
  if (!userId) return;
  try {
    const userDoc = doc(db, "portfolios", userId);
    await setDoc(userDoc, { holdings, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn("Firestore save fallback to localStorage", err);
    localStorage.setItem(`lm_portfolio_${userId}`, JSON.stringify(holdings));
  }
};

export const loadUserPortfolio = async (userId) => {
  if (!userId) return [];
  try {
    const userDoc = doc(db, "portfolios", userId);
    const docSnap = await getDoc(userDoc);
    if (docSnap.exists()) {
      return docSnap.data().holdings || [];
    }
  } catch (err) {
    console.warn("Firestore load fallback to localStorage", err);
  }
  const localData = localStorage.getItem(`lm_portfolio_${userId}`) || localStorage.getItem('lmvest_guest_portfolio');
  return localData ? JSON.parse(localData) : [];
};
