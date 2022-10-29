import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { app } from "../utils/firebaseConfig";

export default function Signout() {
  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    async function logout() {
      signOut(auth);
      router.push("/login");
    }

    logout();
  }, []);

  return null;
}
