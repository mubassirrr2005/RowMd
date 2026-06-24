// Firebase client configuration – values are injected via Vercel environment variables.

import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

let auth: Auth | any;
let db: Firestore | any;
let storage: FirebaseStorage | any;

if (typeof window !== "undefined") {
  // Lazy singleton – Firebase is initialized only when a property is accessed.
  let _app: FirebaseApp | undefined;
  function getApp_(): FirebaseApp {
    if (!_app) {
      _app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    }
    return _app;
  }

  auth = new Proxy({} as Auth, {
    get(_, prop) {
      const a = getAuth(getApp_());
      return Reflect.get(a, prop);
    },
  });

  db = new Proxy({} as Firestore, {
    get(_, prop) {
      const d = getFirestore(getApp_());
      return Reflect.get(d, prop);
    },
  });

  storage = new Proxy({} as FirebaseStorage, {
    get(_, prop) {
      const s = getStorage(getApp_());
      return Reflect.get(s, prop);
    },
  });
} else {
  // Server‑side rendering / build: provide empty objects to avoid Firebase init.
  auth = {} as any;
  db = {} as any;
  storage = {} as any;
}

export { auth, db, storage };
