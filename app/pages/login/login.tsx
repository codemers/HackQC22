import { app } from "../../utils/firebaseConfig";
import Image from "next/image";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

import circuitElectriqueLogo from "../../public/images/login/circuit-electrique-logo.png";
import googleLogo from "../../public/images/login/google-logo.png";

export default function Login() {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  console.log(user);
  const router = useRouter();

  async function handleSignInWithGoogle() {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");

    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();

    localStorage.setItem("access_token", idToken);
  }

  if (user) {
    router.push("/app");
    return null;
  }

  return (
    <div className="h-screen bg-login-background bg-cover bg-center">
      <div className="hero container pb-10 h-3/6 flex flex-col items-center justify-end">
        <Image className="mx-auto h-36 w-auto" src={circuitElectriqueLogo} alt={""} />
      </div>
      
      <div className="flex justify-center items-center mx-auto h-3/6">
        <button className="py-2 px-4 inline-flex items-center mx-auto h-16 bg-secondary rounded-md"
          onClick={async () => {
            handleSignInWithGoogle();
          }}>
            <Image src={googleLogo} alt={""} className="h-8 w-auto"/>
            <span className="text-white ml-2">Sign In With Google</span>
        </button>
      </div>
    </div>
  );
}
