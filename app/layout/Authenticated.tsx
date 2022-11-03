import Head from "next/head";
import Image from "next/image";
import Navigation from "../components/Navigation/Navigation";
import styles from "../styles/Home.module.css";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../utils/firebaseConfig";
import cx from "classix";
import { XCircleIcon } from "@heroicons/react/20/solid";

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
  showNotification = false,
}: Props) {
  const auth = getAuth(app);
  const router = useRouter();

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

  function handleEnableMyPark() {
    alert("Enable Park");
    // set visibile of my park to true
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
            Le réseau est surchargé. Voulez-vous rendre votre borne disponible?
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
