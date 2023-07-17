import firebase_app from "@/firebase/config";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebase_app);

export async function signUp(email, password) {
  let result = null, error = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    error = err;
  }
  return { result, error };
}

export async function signIn(email, password) {
  let result = null, error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    error = err;
  }

  return { result, error };
}