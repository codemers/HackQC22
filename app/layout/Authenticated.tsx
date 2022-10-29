import Head from "next/head";
import Image from "next/image";
import Navigation from "../components/Navigation/Navigation";
import styles from "../styles/Home.module.css";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { app } from "../utils/firebaseConfig";
import cx from "classix";

type Props = {
  children: React.ReactNode;
  adminView?: boolean;
  className?: string;
};

export default function Authenticated({ children, adminView, className }: Props) {
  const auth = getAuth(app);
  const router = useRouter();

  const [user, loading, error] = useAuthState(auth);

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

  return (
    <div
      className="flex flex-col justify-between overflow-scroll"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <div className={cx(className)}>{children}</div>
      <div className="absolute bottom-0 w-full">
        <Navigation adminView={adminView} />
      </div>
    </div>
  );
}
