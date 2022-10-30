import { useState } from "react";
import Link from "next/link";
import { XCircleIcon, BoltIcon, MagnifyingGlassIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";

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
          <h1 className="text-3xl mb-10 text-white">Quel type de borne de recharge détenez-vous ?</h1>
        </div>
      </div>

      <div className="h-full bg-white p-6">
        <div className="relative mb-6 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-black-500 sm:text-sm"><MagnifyingGlassIcon className="h-4"/></span>
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-primary focus:ring-indigo-500 sm:text-sm"
            placeholder="Recherche"
          />
        </div>
        
        <button className={
          selectButton === TerminalType.EVDuty40 ? "w-full align-middle h-14 border solid rounded-md bg-white border-[#00A0B4] text-left p-2 mb-3" : "w-full align-middle h-14 border solid rounded-md bg-white text-left p-2 mb-3"
        } onClick={() => handleSelectButton(TerminalType.EVDuty40)}>
          <BoltIcon className="h-7 inline-block float-left" /><span className="ml-2">EVduty-40 (30A)</span>
        </button>
        <button className={
          selectButton === TerminalType.FLO ? "w-full align-middle h-14 border solid rounded-md bg-white border-[#00A0B4] text-left p-2 mb-3" : "w-full align-middle h-14 border solid rounded-md bg-white text-left p-2 mb-3"
        } onClick={() => handleSelectButton(TerminalType.FLO)}>
          <BoltIcon className="h-7 inline-block float-left" /><span className="ml-2">FLO Maison™ X5</span>
        </button>
        <button className={
          selectButton === TerminalType.TeslaWall ? "w-full align-middle h-14 border solid rounded-md bg-white border-[#00A0B4] text-left p-2 mb-3" : "w-full align-middle h-14 border solid rounded-md bg-white text-left p-2 mb-3"
        } onClick={() => handleSelectButton(TerminalType.TeslaWall)}>
          <BoltIcon className="h-7 inline-block float-left" /><span className="ml-2">Tesla Wall Connector</span>
        </button>
        <button className={
          selectButton === TerminalType.Other ? "w-full align-middle h-14 border solid rounded-md bg-white border-[#00A0B4] text-left p-2 mb-3" : "w-full align-middle h-14 border solid rounded-md bg-white text-left p-2 mb-3"
        } onClick={() => handleSelectButton(TerminalType.Other)}>
          <BoltIcon className="h-7 inline-block float-left" /><span className="ml-2">Borne de recharge</span>
        </button>
      </div>

      <div className="min-h-1/8 max-h-1/8 w-screen bg-white border solid p-6 absolute bottom-0 TerminalStep2 mb-4">
        <Link href="/app/terminal/step1" className="font-bold mb-6 underline inline-flex p-0 m-auto">Précédent</Link>
        {selectButton !== TerminalType.None && (
          <Link href="/app/terminal/step3" >
            <button className="w-fit p-3 pr-6 pl-6 align-middle border solid rounded-3xl bg-[#02B3C9] text-white text-center inline-flex float-right">
              <span className="mr-4 font-bold flex">Suivant <ArrowLongRightIcon className="w-6"/></span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
