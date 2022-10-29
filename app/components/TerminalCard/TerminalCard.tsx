import cx from "classix";
import { useState } from "react";

import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";

type Props = {
  onClose: () => void;
};

export default function TerminalCard(props: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={cx("bg-white p-4 flex flex-col items-start")}
      style={{ height: isExpanded ? "calc(100vh - 64px)" : "128" }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="flex justify-between w-full">
        <h1>MRC du Fjors-du-Saguenay</h1>
        <button onClick={props.onClose}>
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
      <h2 className="text-gray-400">372,6 km- Saint-Honoré </h2>
      <div className="bg-green-500 px-2 rounded-md mt-2">
        <span className="text-white text-sm">Disponible</span>
      </div>
    </div>
  );
}
