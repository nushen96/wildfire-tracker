import { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./LocationMarker";
import LocationInfoBox from "./LocationInfoBox";
const Map = ({ center, zoom, wildfires }) => {
  const [locationInfo, setLocationInfo] = useState(null);
  return (
    <div className="map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
        defaultCenter={center}
        defaultZoom={zoom}
      >
        {wildfires.map((wildfire) => (
          <LocationMarker
            lat={wildfire.geometry[0].coordinates[1]}
            lng={wildfire.geometry[0].coordinates[0]}
            onClick={() =>
              setLocationInfo({ id: wildfire.id, title: wildfire.title })
            }
          />
        ))}
      </GoogleMapReact>
      {locationInfo && <LocationInfoBox info={locationInfo} />}
    </div>
  );
};

Map.defaultProps = {
  center: {
    lat: 43.3265,
    lng: -122.8756,
  },
  zoom: 6,
};

export default Map;
