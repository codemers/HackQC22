import Authenticated from "../../../layout";
import GoogleMapReact from "google-map-react";
import useGeolocation from "react-hook-geolocation";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import QueueListIcon from "@heroicons/react/20/solid/QueueListIcon";

function LocationPin({ lng, lat }: { lng: number; lat: number }) {
  return (
    // @ts-ignore
    <div
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
          <input
            className="h-14 w-full bg-white rounded-md shadow-md mr-2 px-2"
            placeholder="Borne, site ou adresse"
          ></input>
          <button className="bg-white flex items-center justify-center px-4 rounded-md shadow-md">
            <QueueListIcon className="w-5 h-5 text-gray-400" />
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
