import { ImageOverlay, Marker, Popup } from "react-leaflet";
import { useState, useRef, useMemo, useCallback } from "react";

const DraggableMarker = () => {
  const center = {
    lat: 0,
    lng: 0,
  };
  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState(center);
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );
  // console.log(position);
  return (
    <Marker
      draggable={draggable}
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    >
      <Popup minWidth={90} position={position}>
        <span>"Marker is draggable"</span>
        <br />
        <span>
          Position:
          {"{ lat :" +
            Math.round(position.lat) +
            ", lng :" +
            Math.round(position.lng) +
            "}"}
        </span>
      </Popup>
    </Marker>
  );
};
export default DraggableMarker;
