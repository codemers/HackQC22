import Link from "next/link";
import { XCircleIcon, ArrowLongRightIcon } from "@heroicons/react/20/solid";

export default function MyTerminalStep3() {
  return (
    <div className="h-screen bg-my-terminal-background bg-cover bg-center overflow-hidden">
      <div className="min-h-3/8 max-h-3/8">
        <div className="grid grid-cols-2 p-4">
          <Link href="/app/profile">
            <XCircleIcon className="h-10 block float-left" />
          </Link>
        </div>
        <div className="pl-6">
          <h1 className="text-3xl mb-10 text-white">Où se trouve votre borne de recharge ?</h1>
        </div>
      </div>

      <div className="h-full bg-white p-6">
        <h1 className="text-3xl mb-10 text-white">BIG MAP COOL</h1>
      </div>

      <div className="min-h-1/8 max-h-1/8 w-screen bg-white border solid p-6 absolute bottom-0 TerminalStep3">
        <Link href="/app/terminal/step2" className="font-bold mb-6 underline inline-flex p-0 m-auto">Précédent</Link>
        <Link href="/app/terminal/step3">
          <button className="w-fit p-3 pr-6 pl-6 align-middle border solid rounded-3xl bg-[#02B3C9] text-white text-center inline-flex float-right">
            <span className="mr-4 font-bold flex">Suivant <ArrowLongRightIcon className="w-6"/></span>
          </button>
        </Link>
      </div>
    </div>
  );
}
