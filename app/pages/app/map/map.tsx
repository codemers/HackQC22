import Authenticated from "../../../layout";
import GoogleMapReact from "google-map-react";
import useGeolocation from "react-hook-geolocation";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import QueueListIcon from "@heroicons/react/20/solid/QueueListIcon";
import MagnifyingGlassIcon from "@heroicons/react/20/solid/MagnifyingGlassIcon";
import InformationCircleIcon from "@heroicons/react/20/solid/InformationCircleIcon";
import AdjustmentsHorizontalIcon from "@heroicons/react/20/solid/AdjustmentsHorizontalIcon";
import ArrowUpRightIcon from "@heroicons/react/20/solid/ArrowUpRightIcon";

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

export default function Map() {
  const geolocation = useGeolocation();

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
          <button className="bg-white flex items-center justify-center px-4 border-gray-100 w-13 h-13 py-[11px] rounded-b-md">
            <ArrowUpRightIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDXkcad7PNb_VEEeiSJ9sL_7sPX9s40C94" }}
          defaultCenter={{
            lat: geolocation.latitude,
            lng: geolocation.longitude,
          }}
          options={{ zoomControl: false, fullscreenControl: false }}
          defaultZoom={11}
        >
          {/* @ts-ignore */}
          <LocationPin lat={geolocation.latitude} lng={geolocation.longitude} />
        </GoogleMapReact>
      </div>
    </Authenticated>
  );
}
