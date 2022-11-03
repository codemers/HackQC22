import { useState } from "react";
import Link from "next/link";
import {
  XCircleIcon,
  MagnifyingGlassIcon,
  ArrowLongRightIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";
import { BoltIcon } from "@heroicons/react/24/outline";

enum TerminalType {
  None = 0,
  EVDuty40 = 1,
  FLO = 2,
  TeslaWall = 3,
  Other = 4,
}

export default function MyTerminalStep2() {
  const [selectButton, setSelectButton] = useState<TerminalType>(0);

  function handleSelectButton(terminalType: TerminalType) {
    setSelectButton(terminalType);

    localStorage.setItem("terminal_step2_teminal_type", selectButton.toString());

    if (terminalType === TerminalType.EVDuty40) {
      localStorage.setItem("terminal_step2_teminal_name", "EVduty-40 (30A)");
    } else if (terminalType === TerminalType.FLO) {
      localStorage.setItem("terminal_step2_teminal_name", "FLO Maison™ X5");
    } else if (terminalType === TerminalType.TeslaWall) {
      localStorage.setItem("terminal_step2_teminal_name", "Tesla Wall Connector");
    } else if (terminalType === TerminalType.Other) {
      localStorage.setItem("terminal_step2_teminal_name", "Borne de recharge autre");
    }
  }

  return (
    <div className="h-screen  bg-cover bg-center overflow-hidden w-full">
      <img src="/images/top-linear-gradient.png" className="w-full absolute" />
      <div className="min-h-3/8 max-h-3/8 absolute top-0 z-50 w-full">
        <div className="flex w-full p-6">
          <div className="flex justify-between flex-row w-full items-center">
            <div className="self-start">
              <Link href="/app/profile">
                <XCircleIcon className="h-10 block float-left text-white" />
              </Link>
            </div>
            <div className="align">
              <Link href="/app/profile">
                <div className="border border-white rounded-xl px-4">
                  <span className="text-white text-md">Aide</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="pl-6">
          <h1 className="text-3xl mb-10 text-white">
            Quel type de borne de <br />
            recharge détenez-vous ?
          </h1>
        </div>
      </div>

      <div className="h-full bg-white p-6 mt-64">
        <div className="relative mb-6 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-black-500 sm:text-sm">
              <MagnifyingGlassIcon className="h-4 text-[#133B62]" />
            </span>
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 pl-10 pr-12 text-[#133B62] sm:text-sm"
            placeholder="Rechercher"
          />
        </div>

        <button
          className={
            selectButton === TerminalType.EVDuty40
              ? "w-full align-middle h-14 border solid rounded-md bg-white border-[#00A0B4] text-left p-2 mb-3"
              : "w-full align-middle h-14 border solid rounded-md bg-white text-left p-2 mb-3"
          }
          onClick={() => handleSelectButton(TerminalType.EVDuty40)}
        >
          <BoltIcon className="h-7 inline-block float-left" />
          <span className="ml-2">EVduty-40 (30A)</span>
        </button>
        <button
          className={
            selectButton === TerminalType.FLO
              ? "w-full align-middle h-14 border solid rounded-md bg-white border-[#00A0B4] text-left p-2 mb-3"
              : "w-full align-middle h-14 border solid rounded-md bg-white text-left p-2 mb-3"
          }
          onClick={() => handleSelectButton(TerminalType.FLO)}
        >
          <BoltIcon className="h-7 inline-block float-left" />
          <span className="ml-2">FLO Maison™ X5</span>
        </button>
        <button
          className={
            selectButton === TerminalType.TeslaWall
              ? "w-full align-middle h-14 border solid rounded-md bg-white border-[#00A0B4] text-left p-2 mb-3"
              : "w-full align-middle h-14 border solid rounded-md bg-white text-left p-2 mb-3"
          }
          onClick={() => handleSelectButton(TerminalType.TeslaWall)}
        >
          <BoltIcon className="h-7 inline-block float-left" />
          <span className="ml-2">Tesla Wall Connector</span>
        </button>
        <button
          className={
            selectButton === TerminalType.Other
              ? "w-full align-middle h-14 border solid rounded-md bg-white border-[#00A0B4] text-left p-2 mb-3"
              : "w-full align-middle h-14 border solid rounded-md bg-white text-left p-2 mb-3"
          }
          onClick={() => handleSelectButton(TerminalType.Other)}
        >
          <BoltIcon className="h-7 inline-block float-left" />
          <span className="ml-2">Borne de recharge</span>
        </button>
      </div>

      <div className="min-h-1/8 max-h-1/8 w-screen bg-white border solid p-6 absolute bottom-0 TerminalStep2 flex w-full justify-between">
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
        {selectButton !== TerminalType.None && (
          <Link href="/app/terminal/step3">
            <button className="w-fit p-3 pr-6 pl-6 align-middle border solid rounded-3xl bg-[#02B3C9] text-white text-center inline-flex float-right">
              <span className="font-bold flex">Suivant</span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
