// Demo stand-in for src/services/firebase/firebaseApp.ts. We pretend
// Firebase IS configured (so LoginPage doesn't show the config warning) but
// we never call initializeApp/getAuth/getFirestore — nothing here touches
// the network. Nothing in demoServices.ts actually imports firebaseAuth()/
// firestore(), so these just need to exist and not throw if referenced.
export const isFirebaseConfigured = true;

export function firebaseAuth(): never {
  throw new Error('demo: firebaseAuth() should never be called in the screenshot harness');
}

export function firestore(): never {
  throw new Error('demo: firestore() should never be called in the screenshot harness');
}
