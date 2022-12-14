import Authenticated from "../../../layout";
import GoogleMapReact from "google-map-react";
import useGeolocation from "react-hook-geolocation";
import useSupercluster from "use-supercluster";
import { useEffect, useRef, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import QueueListIcon from "@heroicons/react/20/solid/QueueListIcon";
import MagnifyingGlassIcon from "@heroicons/react/20/solid/MagnifyingGlassIcon";
import InformationCircleIcon from "@heroicons/react/20/solid/InformationCircleIcon";
import AdjustmentsHorizontalIcon from "@heroicons/react/20/solid/AdjustmentsHorizontalIcon";
import ArrowUpRightIcon from "@heroicons/react/20/solid/ArrowUpRightIcon";
import cx from "classix";
import ParkCard from "../../../components/ParkCard/ParkCard";

import MapCmp from "../../../components/Map/Map";
import { database } from "../../../utils/firebaseConfig";
import {
  collection,
  connectFirestoreEmulator,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export type Reservation = {
  userId: string;
  parkId: string;
  terminalId: string;
  id: string;
};

export type Park = {
  id: string;
  parkName: string;
  lng: number;
  lat: number;
  state: State;
  terminals: { name: string; available: boolean; type: string }[];
  city: string;
  streetAddress: string;
  visible: boolean;
};

function LocationPin({ lng, lat }: { lng: number; lat: number }) {
  return (
    // @ts-ignore
    <div
      // @ts-ignore
      lat={lat}
      lng={lng}
      className="bg-white rounded-full w-6 h-6 flex items-center justify-center"
    >
      <div className="w-4 h-4 bg-blue-500 rounded-full animate-scale"></div>
    </div>
  );
}

type State = "private" | "public";

function ParkPin({
  id,
  lng,
  lat,
  zoom,
  onClick,
  state,
  park,
}: {
  id: string;
  lng: number;
  lat: number;
  zoom: number;
  onClick: (id: string) => void;
  state: State;
  park?: Park;
}) {
  return (
    <button
      // @ts-ignore
      lat={lat}
      lng={lng}
      className={cx(
        "rounded-md flex items-center justify-between px-2 w-20 h-10 border-white border",
        state === "private" ? "bg-[#50b0C6]" : "bg-[#8ABF55]"
      )}
      onClick={() => onClick(id)}
    >
      <div className="w-6 h-6 flex items-center justify-center bg-white rounded-md">
        {park?.state === "public" ? (
          <svg
            className="w-4"
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
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
          >
            <g clip-path="url(#clip0_46_972)">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17 0C7.6113 0 0 7.6113 0 17C0 26.3887 7.6113 34 17 34C26.3887 34 34 26.3887 34 17C34 7.6113 26.3887 0 17 0ZM27.4669 17.79C27.3892 17.8901 27.2741 17.9547 27.1478 17.9706C27.0214 17.9846 26.8941 17.95 26.794 17.8704L25.2515 16.6593V25.9975C25.2515 26.2623 25.0362 26.4776 24.7713 26.4776H11.942V22.1141C11.942 20.5548 13.2103 19.2866 14.7696 19.2866L18.2111 21.5778C18.9852 22.0767 20.0035 21.5217 20.0035 20.6007V20.5249H21.3588C21.6096 20.5249 21.8127 20.3218 21.8127 20.0718C21.8127 19.8219 21.6096 19.6179 21.3588 19.6179H20.0035V17.5953H21.3588C21.6096 17.5953 21.8127 17.3922 21.8127 17.1413C21.8127 16.8905 21.6096 16.6893 21.3588 16.6893H20.0035V16.6125C20.0035 15.6925 18.9852 15.1374 18.2111 15.6354L14.7696 17.9266C12.4606 17.9266 10.5821 19.8051 10.5821 22.1141V26.4776H9.22865C8.96377 26.4776 8.7485 26.2623 8.7485 25.9975V16.6593L7.20602 17.8704C7.10587 17.95 6.97858 17.9846 6.85223 17.9706C6.72587 17.9547 6.61168 17.8901 6.53213 17.79L4.86236 15.6644C4.78467 15.5642 4.74817 15.4369 4.76408 15.3106C4.77812 15.1852 4.84364 15.0691 4.94379 14.9914L16.7042 5.7534C16.8774 5.61675 17.1226 5.61675 17.2967 5.7534L29.0562 14.9914C29.2649 15.1543 29.3005 15.4566 29.1376 15.6644L27.4669 17.79Z"
                fill={"#00A0B4"}
              />
            </g>
            <defs>
              <clipPath id="clip0_46_972">
                <rect width="34" height="34" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
      </div>

      <div className="font-bold flex items-start">
        <span className="text-white text-xl">
          {park?.terminals.filter((t) => t.available).length}
        </span>
        <span className="text-gray-300 mt-1"> / {park?.terminals.length}</span>
      </div>
    </button>
  );
}
function TerminalPin(props: {
  id: string;
  lng: number;
  lat: number;
  zoom: number;
  onClick: (id: string) => void;
  state: State;
  park?: Park;
  reservedByMe?: Reservation;
}) {
  if (props.park?.state === "private") {
    return (
      <div
        className={cx(
          "rounded-full h-48 w-48 flex items-center justify-center"
        )}
        style={{
          backgroundColor:
            props.zoom > 15 && !props.reservedByMe
              ? "rgba(80, 176, 198, 0.2)"
              : "transparent",
        }}
      >
        <ParkPin {...props} />
      </div>
    );
  }
  return <ParkPin {...props} />;
}

export default function Map() {
  // const geolocation = useGeolocation();
  const [zoom, setZoom] = useState(14);
  const [bounds, setBounds] = useState(null);
  const [filteredParks, setFilteredParks] = useState<Park[]>([]);

  const getParks = useQuery(
    ["getParks"],
    async () => {
      const parkRef = collection(database, "parks");
      const q = query(parkRef, where("city", "==", "Qu??bec"));

      const querySnapshot = await getDocs(q);
      const parks: Park[] = [];
      querySnapshot.forEach((doc) => {
        const park = doc.data();

        parks.push({
          id: doc.id,
          parkName: park.parkName,
          lng: parseFloat(park.longitude),
          lat: parseFloat(park.latitude),
          state: park.type,
          // @ts-ignore
          terminals: park.terminals?.map((t) => ({
            name: t.stationName,
            available: t.status === "available",
            type: t.chargeLevel,
          })),
          city: park.city,
          streetAddress: park.addresse,
          visible: park.visible,
        });
      });

      setFilteredParks(parks);
      return { parks, filteredParks: parks };
    },
    {
      onError: (e) => console.log(e),
      refetchInterval: 5000,
    }
  );

  const getReservations = useQuery(
    ["getReservations"],
    async () => {
      const auth = getAuth();
      const transactionRef = collection(database, "transactions");
      const q = query(
        transactionRef,
        where("userId", "==", auth.currentUser?.uid)
      );

      const querySnapshot = await getDocs(q);
      const reservations: Reservation[] = [];
      querySnapshot.forEach((doc) => {
        const transaction = doc.data();

        // @ts-ignore
        reservations.push({ ...transaction, id: doc.id });
      });
      return reservations;
    },
    {
      onError: (e) => console.log(e),
    }
  );

  const parks = getParks.data?.parks || [];
  const [selectedPark, setSelectedPark] = useState<string>();
  const [parkToShow, setParkToShow] = useState<"all" | "private">("all");
  const [cardIsExpanded, setCardIsExpand] = useState(false);
  useEffect(() => {
    if (parkToShow === "all") {
      setFilteredParks(parks);
    } else {
      setFilteredParks(parks.filter((p) => p.state === parkToShow));
    }
  }, [parkToShow]);

  const { clusters, supercluster } = useSupercluster({
    points: filteredParks
      .filter(({ visible }) => visible)
      .map((t) => {
        return {
          type: t.state,
          id: t.id,
          properties: {
            cluster: false,
          },
          geometry: {
            type: "Point",
            coordinates: (() => {
              if (t.state === "private") {
                return [t.lng, t.lat];
              }
              return [t.lng, t.lat];
            })(),
          },
        };
      }),
    bounds,
    zoom,
    options: { radius: 275, maxZoom: 14 },
  });

  function handleExpand(value: boolean) {
    setCardIsExpand(value);
  }

  const geolocation = { longitude: -71.2205628, latitude: 46.807973 };

  // if (!geolocation.longitude || !geolocation.latitude) {
  //   return null;
  // }

  return (
    <Authenticated>
      <div className="w-full h-screen flex justify-center">
        <div className="w-[90%] absolute flex mt-6 z-50">
          <div className="rounded-md shadow-sm w-full mr-2">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              type="email"
              name="email"
              id="email"
              className="block w-full rounded-md border-gray-100 pl-10  sm:text-sm"
              placeholder="Borne, site ou adresse"
            />
          </div>

          <button className="bg-white flex items-center justify-center px-4 rounded-md  border-gray-100">
            <QueueListIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <div className="absolute z-50 right-5 top-20">
          <button className="bg-white flex items-center justify-center px-4 border-gray-100 w-13 h-13 py-[11px] border-b rounded-t-md">
            <InformationCircleIcon className="w-5 h-5 text-gray-400" />
          </button>
          <button
            className="bg-white flex items-center justify-center px-4 border-gray-100 w-13 h-13 py-[11px] border-b"
            onClick={() => {
              if (parkToShow === "all") {
                setParkToShow("private");
              } else {
                setParkToShow("all");
              }
            }}
          >
            <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-400" />
          </button>
          <button className="bg-white flex items-center justify-center px-4 border-gray-100 w-13 h-13 py-[11px] border-b">
            <ArrowUpRightIcon className="w-5 h-5 text-gray-400" />
          </button>
          <button className="bg-white flex items-center justify-center px-3 border-gray-100 w-13 h-13 py-[14px] rounded-b-md">
            <img src={"/images/map/car.png"} className="w-7" />
          </button>
        </div>

        <MapCmp
          center={{
            lat: geolocation.latitude,
            lng: geolocation.longitude,
          }}
          onBoundsChange={setBounds}
          onClick={() => {
            selectedPark && !cardIsExpanded
              ? setSelectedPark(undefined)
              : () => {};
          }}
          zoom={zoom}
          onZoomChange={setZoom}
        >
          <LocationPin lat={geolocation.latitude} lng={geolocation.longitude} />
          {clusters.map((cluster) => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count: pointCount } =
              cluster.properties;

            console.log(cluster);
            if (isCluster) {
              // @ts-ignore
              return (
                <div
                  key={cluster.id}
                  // @ts-ignore
                  lat={latitude}
                  lng={longitude}
                  className="w-8 h-8 bg-[#50b0C6] flex items-center justify-center rounded-full"
                >
                  <span className="p-4 text-white font-bold">
                    {cluster.properties.point_count}
                  </span>
                </div>
              );
            }

            const park = parks.find((p) => p.id === cluster.id);
            return (
              <TerminalPin
                key={cluster.id}
                id={cluster.id}
                lng={longitude}
                lat={latitude}
                zoom={zoom}
                onClick={setSelectedPark}
                state={cluster.type}
                park={park}
                reservedByMe={(getReservations.data || []).find(
                  ({ parkId, terminalId }) => parkId === park?.id
                )}
              />
            );
          })}
        </MapCmp>

        {selectedPark && parks.find((p) => p.id === selectedPark) && (
          <div className="absolute bottom-[64px] w-full z-50">
            <ParkCard
              onClose={() => setSelectedPark(undefined)}
              park={parks.find((p) => p.id === selectedPark) as Park}
              onExpand={handleExpand}
              reservations={getReservations.data || []}
            />
          </div>
        )}
      </div>
    </Authenticated>
  );
}
