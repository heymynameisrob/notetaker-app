import React, { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { onAuthStateChanged, getAuth, User } from 'firebase/auth';
import firebase_app from '@/firebase/config';

const auth = getAuth(firebase_app);

export type AuthContextProps = {
  user: User | null;
  isLoggedIn: boolean;
};

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoggedIn: false,
});

export const useAuthContext = (): AuthContextProps => useContext(AuthContext);

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
