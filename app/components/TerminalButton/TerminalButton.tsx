/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-undef */
import { Switch } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import cx from "classix";
import Link from "next/link";
import { useState } from "react";

type TerminalButtonProps = {
  uid: string;
  name: string;
  address: string;
  image: string;
};

export default function TerminalButton(props: TerminalButtonProps) {
  const [enabled, setEnabled] = useState<boolean>(false);
  return (
    <Link
      href={"/app/terminal/list/" + props.uid}
      className="TerminalButton px-3 py-6 ml-6 mr-6 bg-white grid grid-cols-6 shadow-md"
    >
      <span className="m-auto text-center">
        <img src="/images/my-terminal-icon.png" alt="" className="w-12 h-12" />
      </span>
      <span className="col-span-5 flex ml-4">
        <div className="flex-column flex-grow flex-wrap">
          <div className="flex justify-between w-full">
            <span className="title block text-lg">{props.name}</span>
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
          <span className="subtitle block text-base text-gray-500">
            {props.address}
          </span>
        </div>
      </span>
    </Link>
  );
}
