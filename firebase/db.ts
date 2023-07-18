import { useState, useEffect } from "react";
import firebase_app from "@/firebase/config";
import {
  getFirestore,
  doc,
  setDoc,
  updateDoc,
  collection,
  onSnapshot,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { DocumentData, DocumentSnapshot } from "firebase/firestore";

type FirestoreData = {
  id: string;
  [key: string]: any;
};

type FirestoreResult = {
  status: "success" | "error";
  message?: string;
  doc?: FirestoreData;
};

type FirestoreError = {
  status: "error";
  message: string;
};

type FirestoreHookReturn<T> = {
  loading: boolean;
  data: T | null;
  error: FirestoreError | null;
};

const useAddData = (
  collection: string,
  id: string,
  data: DocumentData
): FirestoreHookReturn<FirestoreResult> => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FirestoreResult | null>(null);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    const addDataToFirestore = async () => {
      const db = getFirestore(firebase_app);
      setLoading(true);

      try {
        const docRef = await setDoc(doc(db, collection, id), data);
        setResult({ status: "success", doc: { id, ...data } });
      } catch (e: any) {
        setError({ status: "error", message: e.toString() });
      }
      setLoading(false);
    };

    addDataToFirestore();
  }, [collection, id, data]);

  return { loading, data: result, error };
};

const useUpdateData = (
  collection: string,
  id: string,
  data: DocumentData
): FirestoreHookReturn<FirestoreResult> => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FirestoreResult | null>(null);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    const updateDataToFirestore = async () => {
      const db = getFirestore(firebase_app);
      setLoading(true);

      try {
        const docRef = doc(db, collection, id);
        await updateDoc(docRef, data);
        setResult({ status: "success", message: "Document successfully updated!" });
      } catch (e: any) {
        setError({ status: "error", message: e.toString() });
      }
      setLoading(false);
    };

    updateDataToFirestore();
  }, [collection, id, data]);

  return { loading, data: result, error };
};

const useGetData = (
  collection: string,
  id: string
): FirestoreHookReturn<FirestoreData | null> => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<FirestoreData | null>(null);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    const fetchDataFromFirestore = async () => {
      const db = getFirestore(firebase_app);
      setLoading(true);

      try {
        const docRef = doc(db, collection, id);
        const docSnap: DocumentSnapshot<DocumentData> = await getDoc(docRef);

        if (docSnap.exists()) {
          setData({ id, ...docSnap.data() });
        } else {
          setError({ status: "error", message: "No such document!" });
        }
      } catch (e: any) {
        setError({ status: "error", message: e.toString() });
      }
      setLoading(false);
    };

    fetchDataFromFirestore();
  }, [collection, id]);

  return { loading, data, error };
};

const useGetSnapshot = (
  collectionName: string
): FirestoreHookReturn<FirestoreData[]> => {
  const [data, setData] = useState<FirestoreData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    const subscribeToFirestore = async () => {
      const db = getFirestore(firebase_app);
      const unsubscribe = onSnapshot(
        collection(db, collectionName),
        (snapshot) => {
          try {
            const updatedData = snapshot.docs.map(
              (doc) => ({ id: doc.id, ...doc.data() } as FirestoreData)
            );
            setData(updatedData);
            setLoading(false);
          } catch (e: any) {
            setError({ status: "error", message: e.toString() });
            setLoading(false);
          }
        }
      );

      return () => unsubscribe();
    };

    subscribeToFirestore();
  }, [collectionName]);

  return { loading, data, error };
};

const useRemoveData = (
  collection: string,
  id: string
): FirestoreHookReturn<FirestoreResult> => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FirestoreResult | null>(null);
  const [error, setError] = useState<FirestoreError | null>(null);

  useEffect(() => {
    const removeDataFromFirestore = async () => {
      const db = getFirestore(firebase_app);
      setLoading(true);

      try {
        const docRef = doc(db, collection, id);
        await deleteDoc(docRef);
        setResult({ status: "success", message: "Document successfully deleted!" });
      } catch (e: any) {
        setError({ status: "error", message: e.toString() });
      }
      setLoading(false);
    };

    removeDataFromFirestore();
  }, [collection, id]);

  return { loading, data: result, error };
};

export {
  useAddData,
  useGetData,
  useGetSnapshot,
  useRemoveData,
  useUpdateData,
};
