import Link from "next/link";
import { useState } from "react";

import Map from "../../../../components/Map/Map";

import {
  XCircleIcon,
  ArrowLongRightIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  ChevronLeftIcon,
} from "@heroicons/react/20/solid";

function LocationPin({ lng, lat }: { lng: number; lat: number }) {
  return (
    <div
      // @ts-ignore
      lat={lat}
      lng={lng}
      className="w-6 h-6 flex items-center justify-center"
    >
      <div className="w-4 h-4">
        <MapPinIcon />
      </div>
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
      <img
        src="/images/bottom-linear-gradient.png"
        className="w-full absolute -top-32 rotate-180 z-50"
      />
      <div className="min-h-3/8 max-h-3/8 absolute top-0 z-50 w-full">
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
          <h1 className="text-4xl mb-4 text-white">
            Où se trouve votre borne de <br />
            recharge ?
          </h1>
        </div>

        <div className="relative mb-4 rounded-md shadow-sm pl-6 pr-6">
          <div className="pointer-events-none absolute inset-y-0 left-6 flex items-center pl-3">
            <span className="text-black-500 sm:text-sm">
              <MagnifyingGlassIcon className="h-4 text-[#133B62]" />
            </span>
          </div>
          <input
            disabled
            type="text"
            className="block w-full rounded-md border-gray-300 pl-10 pr-12 focus:border-primary focus:ring-indigo-500 sm:text-sm text-[#133B62]"
            placeholder="Recherche"
            onChange={(event) => handleSelectedAddress(event.target.value)}
            value={selectedAddress}
          />
        </div>

        <div className="pl-6 pr-6">
          <Link
            href="/app/terminal/step4"
            className="text-white font-bold underline inline-flex p-0 m-auto"
          >
            Entrez votre adresse manuellement
          </Link>
        </div>
      </div>

      <div className="h-full bg-white">
        <Map zoom={18} center={{ lat: 45, lng: -73 }}>
          <LocationPin lat={45} lng={-73} />
        </Map>
      </div>

      <div className="min-h-1/8 max-h-1/8 bg-white border solid p-6 absolute bottom-0 TerminalStep3 mb-4 flex w-full items-center justify-between">
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
        <div>
          {selectedAddress && (
            <Link href="/app/terminal/step4">
              <button className="w-fit p-3 pr-6 pl-6 align-middle border solid rounded-3xl bg-[#02B3C9] text-white text-center inline-flex float-right">
                <span className=" font-bold flex">Suivant</span>
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
