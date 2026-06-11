import * as admin from "firebase-admin";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

const firebaseAdminConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

let adminDb: Firestore | null = null;
let adminAuth: Auth | null = null;

if (!getApps().length) {
  try {
    if (firebaseAdminConfig.privateKey && firebaseAdminConfig.privateKey.includes("BEGIN PRIVATE KEY") && !firebaseAdminConfig.privateKey.includes("...")) {
      initializeApp({
        credential: cert(firebaseAdminConfig as any),
      });
      adminDb = getFirestore();
      adminAuth = getAuth();
    }
  } catch (error) {
    console.error("Firebase admin initialization error", error);
  }
} else {
  adminDb = getFirestore();
  adminAuth = getAuth();
}

export { adminDb, adminAuth, FieldValue };
