import { addDoc, collection } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { database, app } from "../utils/firebaseConfig";

export default function Login() {
  return (
    <div>
      <h1>Login</h1>
      <button
        onClick={async () => {
          const dbInstance = collection(database, "notes");
          addDoc(dbInstance, {
            test: "test",
          });
        }}
      >
        Test
      </button>
    </div>
  );
}
