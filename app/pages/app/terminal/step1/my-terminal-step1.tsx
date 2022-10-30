import Link from "next/link";
import { XCircleIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";

export default function TerminalStep1() {
  return (
    <div className="h-screen bg-my-terminal-background bg-cover bg-center">
      <div className="h-4/6">
        <div className="grid grid-cols-2 p-4">
          <Link href="/app/profile">
            <XCircleIcon className="h-10 block float-left" />
          </Link>
        </div>
      </div>

      <div className="h-2/6 bg-white p-6">
        <h1 className="text-3xl mb-6">Louez votre borne de recharge !</h1>
        <p className="text-base mb-8">Aidez-nous à augmenter la capacité du réseau de Circuit Électrique.</p>
        <Link href="/app/terminal/step2">
          <button className="w-full align-middle h-14 border solid rounded-3xl bg-[#02B3C9] text-white text-center">
            <span className="mr-2">Allons-y</span>
            <ArrowLongRightIcon className="h-7 inline-block" />
          </button>
        </Link>
      </div>
    </div>
  );
}
