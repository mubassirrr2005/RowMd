import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";
import { getStorage, FirebaseStorage } from "firebase/storage";

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let storage: FirebaseStorage | undefined;

export const initializeFirebase = (config: any) => {
  if (getApps().length > 0) {
    app = getApp();
  } else if (config && config.apiKey && config.apiKey !== "your-api-key") {
    app = initializeApp(config);
  }

  if (app) {
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  }

  return { app, auth, db, storage };
};

export const getFirebaseServices = () => ({ app, auth, db, storage });
