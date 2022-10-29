import Authenticated from "../../../layout";
import GoogleMapReact from "google-map-react";
import useGeolocation from "react-hook-geolocation";
import useSupercluster from "use-supercluster";
import { useRef, useState } from "react";

import QueueListIcon from "@heroicons/react/20/solid/QueueListIcon";
import MagnifyingGlassIcon from "@heroicons/react/20/solid/MagnifyingGlassIcon";
import InformationCircleIcon from "@heroicons/react/20/solid/InformationCircleIcon";
import AdjustmentsHorizontalIcon from "@heroicons/react/20/solid/AdjustmentsHorizontalIcon";
import ArrowUpRightIcon from "@heroicons/react/20/solid/ArrowUpRightIcon";
import cx from "classix";
import TerminalCard from "../../../components/TerminalCard/TerminalCard";

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

function TerminalPin({
  id,
  lng,
  lat,
  zoom,
  onClick,
  state,
}: {
  id: string;
  lng: number;
  lat: number;
  zoom: number;
  onClick: (id: string) => void;
  state: State;
}) {
  if (zoom <= 14) {
    return (
      <button
        // @ts-ignore
        lat={lat}
        lng={lng}
        className="bg-white rounded-full w-6 h-6 flex items-center justify-center"
      >
        <div
          className={cx(
            "w-4 h-4 rounded-full",
            state === "private" ? "bg-pink-500" : "bg-green-500"
          )}
        ></div>
      </button>
    );
  }
  return (
    // @ts-ignore
    <button
      // @ts-ignore
      lat={lat}
      lng={lng}
      className={cx(
        "rounded-md flex items-center px-2 w-20 h-10",
        state === "private" ? "bg-pink-500" : "bg-green-500"
      )}
      onClick={() => onClick(id)}
    >
      <div className="w-4 h-4 bg-gray-500 "></div>
    </button>
  );
}

export default function Map() {
  const geolocation = useGeolocation();
  const [zoom, setZoom] = useState(11);
  const [bounds, setBounds] = useState(null);
  const mapRef = useRef();

  const [selectedTerminal, setSelectedTerminal] = useState<string>();
  const [terminals, setTerminals] = useState([
    {
      lat: 45.61634620767123,
      lng: -73.55157011723178,
      id: "123",
      state: "public" as State,
    },
    {
      lat: 45.6074819,
      lng: -73.5865146,
      id: "1234",
      state: "private" as State,
    },
  ]);

  const { clusters, supercluster } = useSupercluster({
    points: terminals.map((t) => {
      return {
        type: t.state,
        id: t.id,
        properties: {
          cluster: false,
        },
        geometry: {
          type: "Point",
          coordinates: [t.lng, t.lat],
        },
      };
    }),
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 10 },
  });

  if (!geolocation.longitude || !geolocation.latitude) {
    return null;
  }

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
          <button className="bg-white flex items-center justify-center px-4 border-gray-100 w-13 h-13 py-[11px] border-b">
            <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-400" />
          </button>
          <button className="bg-white flex items-center justify-center px-4 border-gray-100 w-13 h-13 py-[11px] border-b">
            <ArrowUpRightIcon className="w-5 h-5 text-gray-400" />
          </button>
          <button className="bg-white flex items-center justify-center px-3 border-gray-100 w-13 h-13 py-[14px] rounded-b-md">
            <img src={"/images/map/car.png"} className="w-7" />
          </button>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDXkcad7PNb_VEEeiSJ9sL_7sPX9s40C94" }}
          defaultCenter={{
            lat: geolocation.latitude,
            lng: geolocation.longitude,
          }}
          onZoomAnimationEnd={(zoom) => setZoom(zoom)}
          options={{ zoomControl: false, fullscreenControl: false }}
          zoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onClick={() =>
            selectedTerminal ? setSelectedTerminal(undefined) : () => {}
          }
          onGoogleApiLoaded={({ map }) => {
            mapRef.current = map;
          }}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom);
            // @ts-ignore
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ]);
          }}
        >
          {/* @ts-ignore */}
          <LocationPin lat={geolocation.latitude} lng={geolocation.longitude} />
          {clusters.map((cluster) => {
            console.log(cluster);
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count: pointCount } =
              cluster.properties;

            if (isCluster) {
              // @ts-ignore
              return (
                <div
                  key={cluster.id}
                  // @ts-ignore
                  lat={latitude}
                  lng={longitude}
                  className="w-8 h-8 bg-blue-500 flex items-center justify-center rounded-full"
                >
                  <span className="p-4 text-white font-bold">
                    {cluster.properties.point_count}
                  </span>
                </div>
              );
            }

            return (
              <TerminalPin
                key={cluster.id}
                id={cluster.id}
                lng={longitude}
                lat={latitude}
                zoom={zoom}
                onClick={setSelectedTerminal}
                state={cluster.type}
              />
            );
          })}
        </GoogleMapReact>

        {selectedTerminal && (
          <div className="absolute bottom-[64px] w-full z-50">
            <TerminalCard onClose={() => setSelectedTerminal(undefined)} />
          </div>
        )}
      </div>
    </Authenticated>
  );
}
