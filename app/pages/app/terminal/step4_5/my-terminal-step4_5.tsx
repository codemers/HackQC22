import Link from "next/link";
import {
  XCircleIcon,
  ArrowLongRightIcon,
  MapPinIcon,
} from "@heroicons/react/20/solid";

import Map from "../../../../components/Map/Map";

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

export default function MyTerminalStep4_5() {
  return (
    <div className="h-screen bg-my-terminal-background bg-cover bg-center overflow-hidden">
      <div className="min-h-3/8 max-h-3/8">
        <div className="grid grid-cols-2 p-4">
          <Link href="/app/profile">
            <XCircleIcon className="h-10 block float-left" />
          </Link>
        </div>
        <div className="pl-6">
          <h1 className="text-3xl mb-10 text-white">
            La *pin* est-elle au bon endroit ?
          </h1>
        </div>
      </div>

      <div className="h-full bg-white">
        <Map zoom={18} center={{ lat: 45.4, lng: -72 }}>
          <LocationPin lat={45.4} lng={-72} />
        </Map>
      </div>

      <div className="min-h-1/8 max-h-1/8 w-screen bg-white border solid p-6 absolute bottom-0 TerminalStep3">
        <Link
          href="/app/terminal/step2"
          className="font-bold mb-6 underline inline-flex p-0 m-auto"
        >
          Précédent
        </Link>
        <Link href="/app/terminal/step5">
          <button className="w-fit p-3 pr-6 pl-6 align-middle border solid rounded-3xl bg-[#02B3C9] text-white text-center inline-flex float-right">
            <span className="mr-4 font-bold flex">
              Suivant <ArrowLongRightIcon className="w-6" />
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}
