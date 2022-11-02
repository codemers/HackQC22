import Link from "next/link";
import { useState } from "react";
import {
  XCircleIcon,
  PlusIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";

import { doc, setDoc } from "firebase/firestore";
import { app, database } from "../../../../utils/firebaseConfig";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

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
  const router = useRouter();

  function handleSelectedTime(time: string, key: string) {
    setSelectedTime({ ...selectedTime, [key]: time });
  }

  async function handleAddTerminal() {
    if (!user) return;

    setIsLoading(true);
    const usersRef = doc(database, "users", user.uid);
    const docSnap = await setDoc(
      usersRef,
      {
        terminals: [
          {
            name: "Ma borne 3",
          },
        ],
      },
      { merge: true }
    );

    setIsLoading(false);
    router.push("/app/terminal/list");
  }

  return (
    <div className="h-screen bg-cover bg-center overflow-hidden">
      <img src="/images/top-linear-gradient.png" className="w-full absolute" />
      <div className="min-h-3/8 max-h-3/8 absolute w-full">
        <div className="flex w-full justify-between p-6">
          <Link href="/app/profile">
            <XCircleIcon className="h-10 block float-left text-white" />
          </Link>
          <div className="align">
            <Link href="/app/profile">
              <div className="border border-white rounded-xl px-4">
                <span className="text-white text-md">Aide</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="pl-6">
          <h1 className="text-3xl mb-10 text-white">
            Quelle est la disponibilité de
            <br /> votre borne ?
          </h1>
        </div>
      </div>
      <div className="h-full bg-white p-6 mt-52">
        <div className="relative mb-3 rounded-md">
          <label className="block mb-2 text-lg font-medium text-gray-900">
            Semaine
          </label>
          <div className="grid grid-cols-7">
            <input
              type="text"
              value={selectedTime.weekStart}
              onChange={(event) =>
                handleSelectedTime(event.target.value, "weekStart")
              }
              className="col-span-3 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-indigo-500 sm:text-sm"
            />
            <span className="text-center">à</span>
            <input
              type="text"
              value={selectedTime.weekEnd}
              onChange={(event) =>
                handleSelectedTime(event.target.value, "weekEnd")
              }
              className="col-span-3 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div className="relative mb-3 rounded-md">
          <label className="block mb-2 text-lg font-medium text-gray-900">
            Fin de semaine
          </label>
          <div className="grid grid-cols-7">
            <input
              type="text"
              value={selectedTime.weekEndStart}
              onChange={(event) =>
                handleSelectedTime(event.target.value, "weekEndStart")
              }
              className="col-span-3 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-indigo-500 sm:text-sm"
            />
            <span className="text-center">à</span>
            <input
              type="text"
              value={selectedTime.weekEndEnd}
              onChange={(event) =>
                handleSelectedTime(event.target.value, "weekEndEnd")
              }
              className="col-span-3 block w-full rounded-md border-gray-300 focus:border-primary focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <p className="font-bold underline inline-flex p-0 m-auto">
          Paramètres avancés (par jour)
        </p>
      </div>
      <div className="min-h-1/8 max-h-1/8 w-screen bg-white border solid p-6 absolute bottom-0 TerminalStep4 flex w-full items-center justify-between">
        <div className="flex items-center">
          <ChevronLeftIcon className="w-5 text-[#133B62]" />
          <div>
            <Link
              href="/app/terminal/step1"
              className="font-bold inline-flex p-0 m-auto text-[#133B62]"
            >
              Précédent
            </Link>
          </div>
        </div>
        {isLoading ? (
          <button className="w-fit p-3 pl-6 align-middle border solid rounded-3xl bg-[#02B3C9] text-white text-center inline-flex float-right">
            <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
              <ArrowPathIcon />
            </svg>
            En ajout...
          </button>
        ) : (
          <button
            className="w-fit p-3  px-6 align-middle border solid rounded-3xl bg-[#02B3C9] text-white text-center inline-flex float-right"
            onClick={() => handleAddTerminal()}
          >
            <span className="font-bold flex">Suivant</span>
          </button>
        )}
      </div>
      )
    </div>
  );
}
