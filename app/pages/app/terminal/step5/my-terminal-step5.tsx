import Link from "next/link";
import { useState } from "react";
import { XCircleIcon, PlusIcon, ArrowPathIcon } from "@heroicons/react/20/solid";

import { doc, setDoc } from "firebase/firestore"; 
import { app, database } from "../../../../utils/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function MyTerminalStep5() {
  const [isLoading, setIsLoading] = useState(false);

  const [selectedTime, setSelectedTime] = useState<any>({
    weekStart: "",
    weekEnd: "",
    weekEndStart: "",
    weekEndEnd: "",
  });
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);

  function handleSelectedTime(time: string, key: string) {
    setSelectedTime({ ...selectedTime, [key]: time });
  }

  async function handleAddTerminal() {
    if(!user) return;

    setIsLoading(true);
    const usersRef = doc(database, "users", user.uid);
    const docSnap = await setDoc(usersRef, {
      terminals: [
        {
          name: "Ma borne 3",
        }
      ]
    }, { merge: true });

    setIsLoading(false);
    document.location.href = "/app/terminal/list";
  }

  return (
      <div className="h-screen bg-my-terminal-background bg-cover bg-center overflow-hidden">
        <div className="min-h-3/8 max-h-3/8">
          <div className="grid grid-cols-2 p-4">
            <Link href="/app/profile">
              <XCircleIcon className="h-10 block float-left" />
            </Link>
          </div>
          <div className="pl-6">
            <h1 className="text-3xl mb-10 text-white">Quelle sera la disponibilité de votre borne ?</h1>
          </div>
        </div>

        <div className="h-full bg-white p-6">
          <div className="relative mb-3 rounded-md">
            <label className="block mb-2 text-lg font-medium text-gray-900">Semaine</label>
            <div className="grid grid-cols-7">
              <input
                type="text"
                value={selectedTime.weekStart}
                onChange={(event) => handleSelectedTime(event.target.value, "weekStart")}
                className="col-span-3 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-indigo-500 sm:text-sm"
              />
              <span className="text-center">à</span>
              <input
                type="text"
                value={selectedTime.weekEnd}
                onChange={(event) => handleSelectedTime(event.target.value, "weekEnd")}
                className="col-span-3 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="relative mb-3 rounded-md">
            <label className="block mb-2 text-lg font-medium text-gray-900">Fin de semaine</label>
            <div className="grid grid-cols-7">
              <input
                type="text"
                value={selectedTime.weekEndStart}
                onChange={(event) => handleSelectedTime(event.target.value, "weekEndStart")}
                className="col-span-3 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-indigo-500 sm:text-sm"
              />
              <span className="text-center">à</span>
              <input
                type="text"
                value={selectedTime.weekEndEnd}
                onChange={(event) => handleSelectedTime(event.target.value, "weekEndEnd")}
                className="col-span-3 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <p className="font-bold underline inline-flex p-0 m-auto">Paramètres avancés (par jour)</p>
        </div>

        <div className="min-h-1/8 max-h-1/8 w-screen bg-white border solid p-6 absolute bottom-0 TerminalStep4 mb-4">
          <Link href="/app/terminal/step2" className="font-bold mb-6 underline inline-flex p-0 m-auto">Précédent</Link>
          {isLoading ? (
            <button className="w-fit p-3 pl-6 align-middle border solid rounded-3xl bg-[#02B3C9] text-white text-center inline-flex float-right">
              <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"><ArrowPathIcon /></svg>
              Processing...
            </button>
          ): (
            <button className="w-fit p-3 pl-6 align-middle border solid rounded-3xl bg-[#02B3C9] text-white text-center inline-flex float-right" onClick={() => handleAddTerminal()}>
              <span className="mr-4 font-bold flex">Ajouter <PlusIcon className="w-6"/></span>
            </button>
          )}
          </div>
          )
      </div>
  );
}
