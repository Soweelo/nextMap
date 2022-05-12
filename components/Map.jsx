import styles from "../styles/Map.module.css";
import Image from "next/image";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L, { latLngBounds } from "leaflet";
import { useRef, useMemo } from "react";
const Map = () => {
  // Variables
  const mapSW = [0, 4096],
    mapNE = [4096, 0];
  const map = useRef();
  const NE = useMemo(
    () => ({
      click() {
        map.unproject(mapSW, map.getMaxZoom());
      },
    }),
    [map]
  );
  const SW = useMemo(
    () => ({
      click() {
        map.unproject(mapNE, map.getMaxZoom());
      },
    }),
    [map]
  );
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Try me</h1>
      </div>
      <div className={styles.mapWrapper}>
        <MapContainer
          ref={map}
          center={[0, 0]}
          zoom={2}
          scrollWheelZoom={true}
          maxBounds={latLngBounds(NE, SW)}
        >
          <TileLayer
            url="maps/landscape/{z}/{x}/{y}.png"
            minZoom="1"
            maxZoom="4"
            continuousWorld={false}
            noWrap={true}
            crs={L.CRS.Simple}
          />

          {/*<Marker position={[51.505, -0.09]}>*/}
          {/*  <Popup>*/}
          {/*    A pretty CSS3 popup. <br /> Easily customizable.*/}
          {/*  </Popup>*/}
          {/*</Marker>*/}
        </MapContainer>
      </div>
    </div>
  );
};
export default Map;
