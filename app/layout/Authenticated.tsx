import Head from "next/head";
import Image from "next/image";
import Navigation from "../components/Navigation/Navigation";
import styles from "../styles/Home.module.css";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, database } from "../utils/firebaseConfig";
import cx from "classix";
import { XCircleIcon } from "@heroicons/react/20/solid";
import { useQuery, useQueryClient } from "react-query";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";

type Props = {
  children: React.ReactNode;
  adminView?: boolean;
  className?: string;
  showNotification?: boolean;
};

export default function Authenticated({
  children,
  adminView,
  className,
}: Props) {
  const auth = getAuth(app);
  const router = useRouter();
  const queryClient = useQueryClient();
  const notification = useQuery(
    ["getNotifications"],
    async () => {
      const notifRef = collection(database, "notifications");
      const q = query(notifRef, where("visible", "==", true));

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.length > 0;
    },
    {
      onError: (e) => console.log(e),
      refetchInterval: 5000,
    }
  );

  const showNotification = notification.data || false;

  const [user, loading, error] = useAuthState(auth);
  const [hideNotification, setHideNotification] = useState(false);
  useEffect(() => {
    async function checkIfAuth() {
      const token = await localStorage.getItem("access_token");
      if (!user && !token) {
        router.push("/login");
      }

      // Handle invalid token
    }

    checkIfAuth();
  }, [user]);

  if (!user) {
    return null;
  }

  async function handleRemoveNotification() {
    const notifRef = collection(database, "notifications");
    const q = query(notifRef, where("visible", "==", true));

    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs[0]) {
      return setDoc(
        querySnapshot.docs[0].ref,
        {
          visible: false,
        },
        { merge: true }
      );
    }
  }

  async function handleEnableMyPark() {
    if (!user) return;

    const usersRef = doc(database, "users", user.uid);
    const docSnap = await getDoc(usersRef);

    if (docSnap.exists()) {
      const parkRef = collection(database, "parks");
      const q = query(parkRef, where("type", "==", "private"));

      const querySnapshot = await getDocs(q);
      const privateParkIds: string[] = [];
      querySnapshot.forEach((doc) => {
        privateParkIds.push(doc.id);
      });

      await Promise.all(
        privateParkIds.map((parkId) => {
          setDoc(
            doc(database, "parks", parkId),
            {
              visible: true,
            },
            { merge: true }
          );
        })
      );

      await handleRemoveNotification();
      notification.refetch();
      queryClient.invalidateQueries("getParks");
    }
  }

  return (
    <div
      className="flex flex-col justify-between overflow-scroll"
      style={{ height: "calc(100vh - 64px)" }}
    >
      {showNotification && !hideNotification && (
        <div
          className="absolute top-0 bg-[#02B3C9] w-full p-4"
          style={{ zIndex: 99 }}
        >
          <div className="flex w-full items-center justify-between">
            <h1 className="font-bold text-lg text-white">Notification</h1>
            <button onClick={() => setHideNotification(true)}>
              <XCircleIcon className="w-6 text-white" />
            </button>
          </div>
          <p className="text-md text-white">
            Le r??seau est surcharg??. Voulez-vous rendre votre borne disponible?
          </p>

          <div className="flex w-full justify-end mt-2">
            <div>
              <button className="border border-[#133B62] text-md font-bold px-4 py-2 rounded-md">
                Non
              </button>

              <button
                className="bg-white text-[#133B62] text-md font-bold px-4 py-2 rounded-md ml-2"
                onClick={handleEnableMyPark}
              >
                Oui
              </button>
            </div>
          </div>
        </div>
      )}
      <div className={cx(className)}>{children}</div>
      <div className="absolute bottom-0 w-full border-t">
        <Navigation adminView={adminView} />
      </div>
    </div>
  );
}
