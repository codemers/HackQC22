import { database, app } from "../../utils/firebaseConfig";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

export default function Login() {
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  async function handleSignInWithGoogle() {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    localStorage.setItem("access_token", idToken);
  }

  if (user) {
    router.push("/app");
    return null;
  }

  return (
    <div>
      <h1>Login</h1>
      <button
        onClick={async () => {
          handleSignInWithGoogle();
        }}
      >
        Sign In With Google
      </button>
    </div>
  );
}
