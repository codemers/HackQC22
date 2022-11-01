import Link from "next/link";
import { XCircleIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";

export default function TerminalStep1() {
  return (
    <div className="h-screen bg-cover bg-center">
      <div className="h-4/6">
        <div className="grid grid-cols-2 p-4">
          <Link href="/app/profile">
            <XCircleIcon className="h-10 block float-left" />
          </Link>
        </div>

        <div className="w-full h-full flex items-center justify-center">
          <img src="/images/electric-car.gif" className="w-3/4 -mt-40" />
        </div>
      </div>

      <div className="h-2/6 p-6 absolute bottom-0 z-50 w-full">
        <h1 className="text-4xl mb-6 text-white">
          Louez votre borne de <br />
          recharge !
        </h1>
        <p className="text-lg mb-8 text-white">
          Aidez-nous à augmenter la capacité du réseau de Circuit Électrique.
        </p>
        <Link href="/app/terminal/step2">
          <button className="w-full align-middle h-14 border solid rounded-3xl bg-white text-black text-center">
            <span className="mr-2">Allons-y!</span>
          </button>
        </Link>
      </div>
      <img
        src="/images/bottom-linear-gradient.png"
        className="w-full absolute -bottom-12"
      />
    </div>
  );
}
