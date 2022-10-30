import Link from "next/link";
import { useState } from "react";

import Map from  "../../../../components/Map/Map";

import { XCircleIcon, ArrowLongRightIcon, MapPinIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";

function LocationPin({ lng, lat }: { lng: number; lat: number }) {
  return (
    <div
      // @ts-ignore
      lat={lat}
      lng={lng}
      className="w-6 h-6 flex items-center justify-center"
    >
      <div className="w-4 h-4"><MapPinIcon /></div>
    </div>
  );
}

export default function MyTerminalStep3() {
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  function handleSelectedAddress(address: string) {
    setSelectedAddress(address);
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
          <h1 className="text-3xl mb-4 text-white">Où se trouve votre borne de recharge ?</h1>
        </div>

        <div className="relative mb-4 rounded-md shadow-sm pl-6 pr-6">
          <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center pl-3">
            <span className="text-black-500 sm:text-sm"><MagnifyingGlassIcon className="h-4"/></span>
          </div>
          <input
            disabled
            type="text"
            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-primary focus:ring-indigo-500 sm:text-sm"
            placeholder="Recherche"
            onChange={(event) => handleSelectedAddress(event.target.value)}
            value={selectedAddress}
          />
        </div>
      
        <div className="pl-6 pr-6">
          <Link href="/app/terminal/step4" className="text-white font-bold mb-4 underline inline-flex p-0 m-auto">*Entrez votre adresse manuellement</Link>
        </div>

      </div>

      <div className="h-full bg-white">
        <Map zoom={18} center={{lat: 45, lng: -73}}>
          <LocationPin lat={45} lng={-73} />
        </Map>
      </div>

      <div className="min-h-1/8 max-h-1/8 w-screen bg-white border solid p-6 absolute bottom-0 TerminalStep3 mb-4">
        <Link href="/app/terminal/step2" className="font-bold mb-6 underline inline-flex p-0 m-auto">Précédent</Link>
        {selectedAddress && (
          <Link href="/app/terminal/step4">
            <button className="w-fit p-3 pr-6 pl-6 align-middle border solid rounded-3xl bg-[#02B3C9] text-white text-center inline-flex float-right">
              <span className="mr-4 font-bold flex">Suivant <ArrowLongRightIcon className="w-6"/></span>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
