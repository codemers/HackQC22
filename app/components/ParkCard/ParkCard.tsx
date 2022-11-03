import cx from "classix";
import { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";

import XMarkIcon from "@heroicons/react/20/solid/XMarkIcon";
import { Park, Reservation } from "../../pages/app/map/map";
import {
  ArrowUpRightIcon,
  CameraIcon,
  ChatBubbleLeftIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/20/solid";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {
  ArrowRightIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import Map from "../Map/Map";
import { useQueryClient } from "react-query";

type Props = {
  onClose: () => void;
  park: Park;
  onExpand: (value: boolean) => void;
  reservations: Reservation[];
};

export default function ParkCard(props: Props) {
  const { park, onExpand } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const queryClient = useQueryClient();
  const terminals = park.terminals;
  const parkAvailable = terminals.some((t) => t.available);

  const terminalReservedByMe = props.reservations.find(
    ({ parkId, terminalId }) => parkId === park.id
  );

  function handleReservation(e: any) {
    const functions = getFunctions();
    if (terminalReservedByMe) {
      const cancelReservation = httpsCallable(functions, "cancelReservation");

      cancelReservation({ id: terminalReservedByMe.id, parkId: park.id }).then(
        (result) => {
          queryClient.invalidateQueries("getParks");
          queryClient.invalidateQueries("getReservations");
        }
      );
      return;
    }
    // alert("Reservation not implemented yet");

    const addReservation = httpsCallable(functions, "addReservation");

    addReservation({
      parkId: park.id,
      terminalId: terminals[0].name,
    }).then(() => {
      queryClient.invalidateQueries("getParks");
      queryClient.invalidateQueries("getReservations");
    });
  }

  return (
    <div className="">
      {/* {!isExpanded && ( */}
      <img
        src={"/images/map/image-terminal.png"}
        className={cx(
          "w-full h-32 object-cover",
          !isExpanded && "rounded-t-2xl"
        )}
      />
      {/* )} */}
      <div
        className={cx(
          "bg-white p-4 flex flex-col items-start border-b w-full overflow-scroll"
        )}
        style={{ height: isExpanded ? "calc(100vh - 192px)" : "128" }}
        onClick={() => {
          const value = !isExpanded;
          if (value) {
            setIsExpanded(value);
            onExpand(value);
          }
        }}
      >
        {!isExpanded && (
          <div className="absolute top-24 right-5 mt-2">
            <button className="bg-[#50b0C6] p-2 rounded-full">
              <ArrowUpRightIcon className="w-8 h-8 text-white" />
            </button>
          </div>
        )}
        <div className="flex w-full justify-center">
          {!isExpanded && (
            <button
              onClick={props.onClose}
              className="bg-gray-300 w-6 h-1 rounded-md"
            ></button>
          )}
          {isExpanded && (
            <button onClick={props.onClose} className="-mt-4">
              <ChevronDownIcon className="w-8 text-gray-300" />
            </button>
          )}
        </div>
        <div className="flex justify-between w-full">
          <h1>{park.parkName}</h1>
        </div>
        <div className="flex w-full">
          <svg
            className="w-5 mr-2"
            viewBox="0 0 139 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M57.7029 35.6009C66.6747 20.7113 78.1485 16.2921 85.9182 17.1367C90.5867 17.6439 94.0216 20.0258 95.2097 23.464C96.5323 27.2572 95.173 32.2204 91.5756 37.5595L91.5546 37.5508C81.9433 51.5904 65.5338 58.6766 52.1277 58.3583C51.5861 51.4855 53.4206 43.7294 57.7012 35.6009M136.207 63.9441C132.716 60.7787 127.354 61.041 124.192 64.5247C112.196 77.7598 99.6336 82.1162 91.2104 83.4278C80.8811 85.0594 70.702 82.9871 63.3079 77.7703C56.5096 72.9908 52.7514 66.263 52.1259 58.3706C57.6121 62.9035 71.5127 61.2107 82.6352 57.0065C82.9235 57.4612 83.2537 57.8967 83.6364 58.3006C85.2962 60.1002 87.564 61.0008 89.8319 61.0008C91.9163 61.0008 94.0129 60.2261 95.6605 58.6854C109.807 45.3593 115.542 30.5572 111.348 18.0479C108.078 8.26494 99.0308 1.42528 87.751 0.2046C79.9201 -0.652326 71.7346 1.19444 64.0976 5.52103C55.8282 10.2079 48.7207 17.4515 42.9864 27.0369C42.9445 27.0998 42.9235 27.168 42.8798 27.2257C42.8449 27.2887 42.803 27.3481 42.7715 27.4094C35.9575 40.2527 33.5604 53.1853 35.8335 64.8028C37.986 75.6385 44.2549 85.2029 53.5114 91.7172C62.132 97.7717 73.0327 101 84.4086 101C87.5308 101 90.681 100.741 93.8434 100.255C109.807 97.7507 124.66 89.3633 136.789 75.969C139.952 72.4959 139.689 67.1025 136.207 63.9441Z"
              fill="#00A0B4"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.05467 24.1034C11.52 23.4984 15.8165 25.4895 16.8854 31.6476C18.7203 42.2805 26.5003 51.2524 38.2025 55.5646C42.7044 57.229 47.4082 58.069 52.133 58.1261H52.1417C64.1015 60.9329 82.3407 57.2964 96.6751 47.5088C102.73 43.3607 108.109 38.1272 112 31.8015C110.357 40.6057 104.746 49.8455 95.5261 58.4475L95.3607 58.5823C95.3137 58.6255 95.2737 58.6688 95.2284 58.7241C82.6366 69.4036 67.6564 75 52.7457 75C45.8345 75 38.9406 73.7953 32.2939 71.348C14.7337 64.8736 2.71466 50.9793 0.122497 34.2039C-0.887212 27.2282 4.60526 24.4248 7.05467 24.1034Z"
              fill="#87B925"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M136.207 63.926C132.716 60.7591 127.354 61.0216 124.192 64.5069C112.194 77.7503 99.6334 82.1087 91.2102 83.4192C80.8809 85.0517 70.7019 82.9783 63.3078 77.759C50.9553 69.0788 48.635 53.9634 56.9044 37.1105L57.0092 36.9005C57.2434 36.4631 57.4705 36.0204 57.7029 35.569C66.6746 20.6722 78.1483 16.2508 85.9163 17.0959C87.8609 17.3058 89.5888 17.8482 91.0338 18.6408L91.0442 18.6356C84.6845 12.2702 58.3371 13.2291 43.217 29.9L43.1961 29.8808C41.7686 31.4502 40.4408 33.1562 39.2457 35.0056V35.0143C35.1887 45.3025 34.0129 55.4646 35.8317 64.7869C37.986 75.6279 44.2531 85.1951 53.5096 91.7127C62.1337 97.7701 73.0326 101 84.4102 101C87.5324 101 90.6808 100.743 93.845 100.255C109.809 97.7491 124.66 89.3576 136.791 75.9568C139.953 72.482 139.687 67.086 136.207 63.926Z"
              fill="#133B62"
            />
          </svg>

          <div className="flex justify-between w-full">
            <h2 className="text-gray-400">{`${park.city}`} </h2>
            <div>
              <span className="text-[#8ABF55] text-lg">{`${
                terminals.filter((t) => t.available).length
              }`}</span>
              <span className="text-gray-300 text-sm">{`/${terminals.length}`}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div
            className={cx(
              "px-2 rounded-md mt-2",
              parkAvailable ? "bg-[#8ABF55]" : "bg-red-500"
            )}
          >
            <span className="text-white text-sm">
              {parkAvailable ? "Disponible" : "Indisponible"}
            </span>
          </div>

          <div className="px-2 border h-7 rounded-md">
            <span className="text-black text-sm">{terminals[0].type}</span>
          </div>
        </div>
        {isExpanded && (
          <>
            <p className={cx("mt-2")}>
              <span className="text-black text-sm">
                {park.state === "public" || terminalReservedByMe
                  ? park.streetAddress
                  : "L'adresse sera affichée lorsque la réservation aura été effectuée."}
              </span>
            </p>

            <div className="flex w-full">
              <button
                className="flex flex-row items-center rounded-md p-2 w-full"
                style={{ backgroundColor: "rgba(149, 216, 250, 0.3)" }}
                onClick={handleReservation}
              >
                <div>
                  <CurrencyDollarIcon className="w-5 h-5 text-[#80c4e7]" />
                </div>
                <div className="w-full flex flex-col">
                  <span className="text-sm text-[#80c4e7] ">
                    {!!terminalReservedByMe ? "Annuler" : "Réserver"}
                  </span>
                  <span className="text-xs text-gray-600 ">1 crédit</span>
                </div>
              </button>
              <button
                className="flex flex-col items-center rounded-md p-2 ml-2"
                style={{ backgroundColor: "rgba(149, 216, 250, 0.3)" }}
              >
                <StarIcon className="w-5 h-5 text-[#80c4e7]" />
                <span className="text-xs text-gray-600 ">Favori</span>
              </button>
            </div>
            <div className="mt-8 w-full border-b py-2">
              <span className="text-gray-400">À props</span>
              <div className="w-full h-32">
                <Map zoom={14} center={{ lat: park.lat, lng: park.lng }} />
              </div>
              <span className="text-sm">{park.parkName}</span>
            </div>

            <div className="bg-white mt-8 w-full flex flex-col">
              <button className="flex bg-blue-50 rounded-md p-2 justify-between items-center">
                <div className="flex items-center">
                  <QuestionMarkCircleIcon className="w-5 text-[#80c4e7]" />
                  <span className="ml-2">Boîte à outils - FAQ</span>
                </div>
                <ChevronRightIcon className="w-5 text-gray-400" />
              </button>
              <button className="flex bg-blue-50 rounded-md p-2 justify-between items-center mt-2">
                <div className="flex items-center">
                  <ChatBubbleLeftIcon className="w-5 text-[#80c4e7]" />
                  <span className="ml-2">Soumettre des commentaires</span>
                </div>
                <ChevronRightIcon className="w-5 text-gray-400" />
              </button>
              <button className="flex bg-blue-50 rounded-md p-2 justify-between items-center mt-2">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="w-5 text-[#80c4e7]" />
                  <span className="ml-2">Signaler un problème</span>
                </div>
                <ChevronRightIcon className="w-5 text-gray-400" />
              </button>
              <button className="flex bg-blue-50 rounded-md p-2 justify-between items-center mt-2">
                <div className="flex items-center">
                  <CameraIcon className="w-5 text-[#80c4e7]" />
                  <span className="ml-2">
                    Soumettre une photo de présentation
                  </span>
                </div>
                <ChevronRightIcon className="w-5 text-gray-400" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
