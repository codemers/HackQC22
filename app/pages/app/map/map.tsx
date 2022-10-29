import Authenticated from "../../../layout";
import GoogleMapReact from "google-map-react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";

const defaultProps = {
  center: {
    lat: 10.99835602,
    lng: 77.01502627,
  },
  zoom: 11,
};

export default function Map() {
  return (
    <Authenticated>
      <div className="w-full h-screen">
        {/* <Wrapper apiKey={"AIzaSyDXkcad7PNb_VEEeiSJ9sL_7sPX9s40C94"}></Wrapper> */}
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDXkcad7PNb_VEEeiSJ9sL_7sPX9s40C94" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        ></GoogleMapReact>
      </div>
    </Authenticated>
  );
}
