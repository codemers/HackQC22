import Link from "next/link";
import { useState } from "react";
import { Switch } from "@headlessui/react";
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
import cx from "classix";

export default function MyTerminalStep5() {
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [enabled2, setEnabled2] = useState(false);

  const [selectedTime, setSelectedTime] = useState<any>({
    weekStart: "",
    weekEnd: "",
    weekEndStart: "",
    weekEndEnd: "",
  });
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter();

  const [selectedDays, setSelectedDays] = useState<number[]>([]);
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
            createdAt: new Date().toISOString(),
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
      createdAt: new Date().toISOString(),
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
          <div className="px-2 py-4 shadow-md rounded-xl">
            <div className="flex items-center w-full justify-between px-2">
              <p className="font-bold">Réservation automatique</p>
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className={cx(
                  enabled ? "bg-[#02B3C9]" : "bg-gray-200",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={cx(
                    enabled ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>
          </div>
        </div>
        <div className="mt-6 border border-black rounded-xl w-full">
          <div className="p-4 w-full">
            <div className="grid grid-cols-7 gap-1 w-full">
              {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map(
                (day, index) => (
                  <button
                    key={day}
                    onClick={() => {
                      if (selectedDays.includes(index)) {
                        setSelectedDays(
                          selectedDays.filter((item) => item !== index)
                        );
                      } else {
                        setSelectedDays([...selectedDays, index]);
                      }
                    }}
                    className={cx(
                      "py-4 px-2 rounded-md",
                      selectedDays.includes(index)
                        ? "bg-[#05A6BE]"
                        : "bg-[#a2a2a2]"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-white">{day}</p>
                    </div>
                  </button>
                )
              )}
            </div>

            <div className="flex items-center w-full justify-between mt-6">
              <p className="">Jour entier</p>
              <Switch
                checked={enabled}
                onChange={setEnabled2}
                className={cx(
                  enabled2 ? "bg-[#02B3C9]" : "bg-gray-200",
                  "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                )}
              >
                <span className="sr-only">Use setting</span>
                <span
                  aria-hidden="true"
                  className={cx(
                    enabled2 ? "translate-x-5" : "translate-x-0",
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                  )}
                />
              </Switch>
            </div>

            <hr className="mt-2" />

            <div className="mt-4 flex">
              <div>
                <span className="text-[#133B62]">Début</span>
                <span className="ml-2 border-[#02B3C9] border rounded-md text-[#02B3C9] px-2 py-1">
                  08:00
                </span>
              </div>
              <div className="ml-4">
                <span className="text-[#133B62]">Fin</span>
                <span className="ml-2 border-[#02B3C9] border rounded-md text-[#02B3C9] px-2 py-1">
                  16:00
                </span>
              </div>
            </div>
          </div>
        </div>
        <p className="underline inline-flex p-0 m-auto mt-4 text-[#133B62]">
          Ajouter une plage horaire
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
