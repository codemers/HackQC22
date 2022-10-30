import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";

export default function MyTerminalStep4() {

  return (
    <div className="h-screen bg-my-terminal-background bg-cover bg-center">
      <div className="min-h-1/8 max-h-1/8">
        <div className="grid grid-cols-2 p-4"></div>
      </div>

      <div className="h-full bg-white p-6">
        <div className="grid grid-cols-2">
          <Link href="/app/terminal/step3">
            <ChevronLeftIcon className="h-10 block float-left color-red" />
          </Link>
          <h3 className="text-xl">Confirmez votre adresse</h3>
        </div>

        <div className="grid grid-cols-1 mt-6">
          <div className="relative mb-3 rounded-md shadow-sm">
            <label className="block mb-2 text-lg font-medium text-gray-900">First name</label>
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="relative mb-3 rounded-md shadow-sm">
            <label className="block mb-2 text-lg font-medium text-gray-900">Apt, suite, etc. (Optionnel)</label>
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="relative mb-3 rounded-md shadow-sm">
            <label className="block mb-2 text-lg font-medium text-gray-900">Ville</label>
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div className="grid grid-cols-2 mt-3 gap-4">
            <div className="relative mb-4 rounded-md shadow-sm">
              <label className="block mb-2 text-lg font-medium text-gray-900">Province / Territoire</label>
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="relative mb-4 rounded-md shadow-sm">
              <label className="block mb-2 text-lg font-medium text-gray-900">Code postal</label>
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="relative mb-3 rounded-md shadow-sm">
            <label className="block mb-2 text-lg font-medium text-gray-900">Pays</label>
            <input
              type="text"
              className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <hr className="mt-5 mb-5"></hr>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-xl">Montrer votre adresse précise</h3>
              <p className="text-base">Nous ne communiquerons votre adresse qu&apos;une fois la réservation effectuée.</p>
            </div>
            <div className="mb-6">
              <label className="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" value="" id="default-toggle" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="relative mb-3 rounded-md shadow-sm">
            <label className="block mb-2 text-lg font-medium text-gray-900">Instructions pour s’y rendre</label>
            <textarea
              className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-indigo-500 sm:text-sm"
            />
          </div>

          <Link href="/app/terminal/step3">
            <button className="w-fit p-3 pr-6 pl-6 align-middle border solid rounded-3xl bg-[#02B3C9] text-white text-center inline-flex float-right">
              <span className="mr-4 font-bold flex">Confirmer</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
