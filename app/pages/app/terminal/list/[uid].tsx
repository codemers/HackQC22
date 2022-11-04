import Authenticated from "../../../../layout";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { app, database } from "../../../../utils/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function Terminal() {
  const router = useRouter();
  const { uid } = router.query;

  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const [terminal, setTerminal] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      const usersRef = doc(database, "users", user.uid);
      const docSnap = await getDoc(usersRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        let terminals = docSnap.data().terminals;

        console.log(terminals);
        terminals &&
          terminals.map((thisTerminal: any) => {
            console.log(thisTerminal, thisTerminal.uid, uid);

            if (thisTerminal.uid === uid) {
              console.log("Found terminal", thisTerminal);
              setTerminal(thisTerminal);
              return;
            }
          });
      } else {
        console.log("No such document!");
      }
    };
    fetchData().catch(console.error);
  }, [user, uid]);

  return (
    <Authenticated adminView={true} className="bg-[#FAFAFA]">
      <div className="h-14 text-xl grid grid-cols-5 border-b-2 bg-[#FAFAFA]">
        <p className="col-span-1 m-auto text-center text-[#50B0C6]">
          <Link href="/app/terminal/list">
            <ArrowLeftIcon className="w-6 h-6 inline-block float-right" />
          </Link>
        </p>
        <p className="col-span-3 col-start-2 m-auto text-center">
          {terminal && terminal.name ? terminal.name : "Borne de recharge"}
        </p>
      </div>
      <div className="bg-[#FAFAFA] h-full">
        <div className="pl-[10%] pr-[10%] mt-10">
          <div>
            <p>À propos</p>
            <div className="map min-h-[200px] text-center m-auto align-middle border-gray-800 border-solid border-2">
              [Position de ma borne]
            </div>
          </div>
          <div className="mt-6">
            <div>
              <p>Semaine</p>
              <input
                type="text"
                placeholder="8:00"
                className="w-20 mr-2 rounded-sm"
              />
              à
              <input
                type="text"
                placeholder="18:00"
                className="w-20 ml-2 rounded-sm"
              />
            </div>
            <div className="mt-4">
              <p>Fin de semaine</p>
              <input
                type="text"
                placeholder="8:00"
                className="w-20 mr-2 rounded-sm"
              />
              à
              <input
                type="text"
                placeholder="18:00"
                className="w-20 ml-2 rounded-sm"
              />
            </div>
            <div className="mt-10">
              <p className="font-bold underline">
                Paramètres avancés (par jour)
              </p>
            </div>
          </div>
          <div className="mt-20">
            <p className="text-red-500 font-bold">Supprimer ma borne</p>
          </div>
        </div>
      </div>
    </Authenticated>
  );
}
