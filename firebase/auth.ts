import { useState } from "react";
import firebase_app from "@/firebase/config";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
  AuthError,
  signOut,
  signInWithRedirect,
  GoogleAuthProvider,
  signInWithPopup,

} from "firebase/auth";

const auth = getAuth(firebase_app);

type AuthHookReturn<T> = {
  loading: boolean;
  result: T | null;
  error: AuthError | null;
  signOutUser?: () => Promise<void>;
};

type SignInProps<T> = {
  loading: boolean;
  result: T | null;
  error: AuthError | null;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

type AuthSignOutReturn<T> = {
  loading: boolean;
  result: T | null;
  error: AuthError | null;
  signOutUser: () => Promise<void>;
};



const useSignUp = (): AuthHookReturn<UserCredential> => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UserCredential | null>(null);
  const [error, setError] = useState<AuthError | null>(null);

  const signUp = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setResult(userCredential);
    } catch (err) {
      setError(err as AuthError);
    }
    setLoading(false);
  };

  return { loading, result, error };
};

const useSignIn = (): SignInProps<UserCredential> => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<UserCredential | null>(null);
  const [error, setError] = useState<AuthError | null>(null);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setResult(userCredential);
    } catch (err) {
      setError(err as AuthError);
    }
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      setResult(userCredential);
    } catch (err) {
      setError(err as AuthError);
      console.log(err);
    }
    setLoading(false);
  };

  return { loading, result, error, signIn, signInWithGoogle };
};

const useSignOut = (): AuthSignOutReturn<void> => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<void | null>(null);
  const [error, setError] = useState<AuthError | null>(null);

  const signOutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setResult();
    } catch (err) {
      setError(err as AuthError);
    }
    setLoading(false);
  };

  return { loading, error, result, signOutUser };
};



export { useSignUp, useSignIn, useSignOut };
