import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App() {
  const router = useRouter();
  useEffect(() => {
    router.push("/app/map");
  }, []);

  return null;
}
