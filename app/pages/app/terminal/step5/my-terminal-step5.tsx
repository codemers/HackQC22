import Link from "next/link";
import { useState } from "react";
import {
  XCircleIcon,
  ArrowPathIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";

import { doc, setDoc, addDoc, collection } from "firebase/firestore";
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
    localStorage.setItem("terminal_step5_time", JSON.stringify(selectedTime));
  }

  async function handleAddTerminal() {
    if (!user) return;

    setIsLoading(true);
    const usersRef = doc(database, "users", user.uid);

    var terminal_step2_teminal_name = localStorage.getItem("terminal_step2_teminal_name");
    var terminal_step2_terminal_type = localStorage.getItem("terminal_step2_teminal_type");
    var terminal_step4_address = JSON.parse(localStorage.getItem("terminal_step4_address") || "{}");
    var terminal_step5_time = JSON.parse(localStorage.getItem("terminal_step5_time") || "{}");

    const docSnap = await setDoc(
      usersRef,
      {
        terminals: [
          {
            name: terminal_step2_teminal_name,
            type: terminal_step2_terminal_type,
            address: terminal_step4_address.address + " " + terminal_step4_address.city + " " + terminal_step4_address.stat + " " + terminal_step4_address.zip + " " + terminal_step4_address.country,
            instruction: terminal_step4_address.instruction,
            latitude: "-71.2205628",
            longitude: "46.807973",
            weekStart: terminal_step5_time.weekStart,
            weekEnd: terminal_step5_time.weekEnd,
            weekEndStart: terminal_step5_time.weekEndStart,
            weekEndEnd: terminal_step5_time.weekEndEnd,
            visible: false,
          },
        ],
      },
      { merge: true }
    );

    // Adding terminal to parks
    const parksSnap = await addDoc(collection(database, "parks"), {
      adresse: terminal_step4_address.address + " " + terminal_step4_address.city + " " + terminal_step4_address.stat + " " + terminal_step4_address.zip + " " + terminal_step4_address.country,
      latitude: "-71.2205628",
      longitude: "46.807973",
      type: "private",
      city: terminal_step4_address.city,
      region: "Québec",
      street: terminal_step4_address.address,
      zip: terminal_step4_address.zip,
      visible: false,
      parkName: "Parc de " + user.displayName,
      terminals: [
        {
          chargeLevel: "Niveau 1",
          stationName: "Borne " + terminal_step2_teminal_name + " de " + user.displayName,
          status: "available",
          type: "private",
        }
      ]
    });

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
