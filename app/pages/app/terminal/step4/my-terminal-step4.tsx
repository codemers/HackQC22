import Link from "next/link";
import { useState } from "react";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import { Switch } from "@headlessui/react";
import cx from "classix";

export default function MyTerminalStep4() {
  const [enabled, setEnabled] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>({
    address: "",
    appartement: "",
    city: "",
    stat: "",
    zip: "",
    country: "",
    showAddress: false,
    instruction: "",
  });

  function handleSelectedAddress(value: any, key: string) {
    setSelectedAddress({ ...selectedAddress, [key]: value });

    localStorage.setItem(
      "terminal_step4_address",
      JSON.stringify(selectedAddress)
    );
  }

  return (
    <div className="h-screen bg-cover bg-center">
      <img
        src="/images/bottom-linear-gradient.png"
        className="w-full absolute rotate-180 absolute"
      />

      <div className="h-full py-12 absolute rounded-md">
        <div className="bg-white px-6 pt-6 rounded-2xl">
          <div className="flex items-center">
            <Link href="/app/terminal/step3">
              <ChevronLeftIcon className="w-5 block float-left text-[#133B62]" />
            </Link>
            <h3 className="text-xl col-span-4 ml-2 text-[#133B62]">
              Confirmez votre adresse
            </h3>
          </div>

          <div className="grid grid-cols-1 mt-6">
            <div className="relative mb-3 rounded-md shadow-sm">
              <label className="block mb-2 text-lg font-medium text-gray-900">
                Adresse Civique
              </label>
              <input
                type="text"
                value={selectedAddress.address}
                onChange={(e) =>
                  handleSelectedAddress(e.target.value, "address")
                }
                className="block w-full rounded-md border-[#133B62] sm:text-sm"
              />
            </div>
            <div className="relative mb-3 rounded-md shadow-sm">
              <label className="block mb-2 text-lg font-medium text-gray-900">
                Apt, suite, etc. (Optionnel)
              </label>
              <input
                type="text"
                value={selectedAddress.appartement}
                onChange={(e) =>
                  handleSelectedAddress(e.target.value, "appartement")
                }
                className="block w-full rounded-md border-[#133B62] sm:text-sm"
              />
            </div>
            <div className="relative mb-3 rounded-md shadow-sm">
              <label className="block mb-2 text-lg font-medium text-gray-900">
                Ville
              </label>
              <input
                type="text"
                value={selectedAddress.city}
                onChange={(e) => handleSelectedAddress(e.target.value, "city")}
                className="block w-full rounded-md border-[#133B62] sm:text-sm"
              />
            </div>
            <div className="grid grid-cols-2 mt-3 gap-4">
              <div className="relative mb-4 rounded-md shadow-sm">
                <label className="block mb-2 text-lg font-medium text-gray-900">
                  Province / Territoire
                </label>
                <input
                  type="text"
                  value={selectedAddress.stat}
                  onChange={(e) =>
                    handleSelectedAddress(e.target.value, "stat")
                  }
                  className="block w-full rounded-md border-[#133B62] sm:text-sm"
                />
              </div>
              <div className="relative mb-4 rounded-md shadow-sm">
                <label className="block mb-2 text-lg font-medium text-gray-900">
                  Code postal
                </label>
                <input
                  type="text"
                  value={selectedAddress.zip}
                  onChange={(e) => handleSelectedAddress(e.target.value, "zip")}
                  className="block w-full rounded-md border-[#133B62] sm:text-sm"
                />
              </div>
            </div>
            <div className="relative mb-3 rounded-md shadow-sm">
              <label className="block mb-2 text-lg font-medium text-gray-900">
                Pays
              </label>
              <input
                type="text"
                value={selectedAddress.country}
                onChange={(e) =>
                  handleSelectedAddress(e.target.value, "country")
                }
                className="block w-full rounded-md border-[#133B62] sm:text-sm"
              />
            </div>

            {/* <hr className="mt-5 mb-5"></hr>

            <div className="mb-6 grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <h3 className="text-xl">Montrer votre adresse précise</h3>
                <p className="text-base">
                  Nous ne communiquerons votre adresse qu&apos;une fois la
                  réservation effectuée.
                </p>
              </div>
              <div className="mb-6 col-span-1">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedAddress.showAddress}
                    onChange={(e) =>
                      handleSelectedAddress(e.target.checked, "showAddress")
                    }
                    id="default-toggle"
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div> */}

            <div className="flex items-center w-full justify-between">
              <div>
                <p className="text-lg"> Montrer votre adresse précise</p>
                <p className="text-gray-500">
                  Nous ne communiquerons votre <br />
                  adresse qu'une fois la réservation effectuée.
                </p>
              </div>
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
        <div className="absolute z-50 bottom-0 flex justify-end w-full bg-white pr-4 pb-4">
          <div className="">
            <Link href="/app/terminal/step5" className="mb-6">
              <button className="w-full mb-4 p-3 pr-6 pl-6 align-middle border solid rounded-3xl bg-[#02B3C9] text-white text-center font-bold">
                Confirmer
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
