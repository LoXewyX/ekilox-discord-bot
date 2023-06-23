import { initializeApp } from "firebase/app";
import { collection, getFirestore, addDoc } from "firebase/firestore/lite";

const firebaseConfig = {
  apiKey: "AIzaSyCL1BhcmbnMcB-TUx9z-Ck3Yy4_ZqpBHfA",
  authDomain: "ekilox.firebaseapp.com",
  projectId: "ekilox",
  storageBucket: "ekilox.appspot.com",
  messagingSenderId: "569727203183",
  appId: "1:569727203183:web:5cc4bb41363b4b6b279a9a",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function createTicket(threadId: string, text: string) {
  try {
    await addDoc(collection(db, "tickets"), {
      threadId,
      text,
      openedAt: Date(),
    });
  } catch (e) {
    console.error(e);
  }
}
