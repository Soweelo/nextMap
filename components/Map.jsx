import styles from "../styles/Map.module.css";
import Image from "next/image";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  FeatureGroup,
  Circle,
  Rectangle,
  LayerGroup,
} from "react-leaflet";
import L, { latLngBounds, Icon } from "leaflet";
import { useRef, useMemo } from "react";
import DraggableMarker from "./DraggableMarker";
import Link from "next/link";
const lightBulb = new Icon({
  iconUrl: "images/light-bulb_icon_small.png",
  iconSize: [70, 70],
});
const stockage = new Icon({
  iconUrl: "images/stockage_icon.png",
  iconSize: [70, 70],
});
const Map = ({ setShowModal, showModal }) => {
  // Variables
  const mapSW = [0, 4096],
    mapNE = [4096, 0];
  const map = useRef();
  // const NE = useMemo(
  //   () => ({
  //     click() {
  //       map.unproject(mapSW, map.getMaxZoom());
  //     },
  //   }),
  //   [map]
  // );
  // const SW = useMemo(
  //   () => ({
  //     click() {
  //       map.unproject(mapNE, map.getMaxZoom());
  //     },
  //   }),
  //   [map]
  // );
  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
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
          scrollWheelZoom={false}
          // maxBounds={latLngBounds(NE, SW)}
          maxBounds={latLngBounds([-76, -180], [76, 180])}
        >
          <TileLayer
            url="maps/landscape/{z}/{x}/{y}.png"
            minZoom="1"
            maxZoom="4"
            continuousWorld={false}
            noWrap={true}
            crs={L.CRS.Simple}
          />

          <LayersControl position="topright">
            <LayersControl.Overlay checked name=" Draggable position-marker">
              <DraggableMarker />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Réseau électrique">
              <LayerGroup>
                <Marker position={[-32, -115]} icon={lightBulb}>
                  <Popup width={90}>
                    <div className={styles.elecPopupWrapper}>
                      <b>Point du réseau électrique</b>
                      <br />
                      <div
                        className={styles.elecPopupLink}
                        onClick={handleClick}
                      >
                        Tester mon empreinte sur le climat
                        <Image
                          src="/images/nosgestesclimat.png"
                          width={80}
                          height={80}
                          alt=""
                          objectFit="contain"
                          className={styles.elecPopupImg}
                        />
                      </div>
                    </div>
                  </Popup>
                </Marker>
                <Marker position={[-35, 56]} icon={lightBulb}>
                  <Popup width={90}>
                    <div className={styles.elecPopupWrapper}>
                      <b>Point du réseau électrique</b>
                      <br />
                      <div
                        className={styles.elecPopupLink}
                        onClick={handleClick}
                      >
                        Tester mon empreinte sur le climat
                        <Image
                          src="/images/nosgestesclimat.png"
                          width={80}
                          height={80}
                          alt=""
                          objectFit="contain"
                          className={styles.elecPopupImg}
                        />
                      </div>
                    </div>
                  </Popup>
                </Marker>
                <Marker position={[27, -52]} icon={lightBulb}>
                  <Popup width={90}>
                    {" "}
                    <div className={styles.elecPopupWrapper}>
                      <b>Point du réseau électrique</b>
                      <br />
                      <div
                        className={styles.elecPopupLink}
                        onClick={handleClick}
                      >
                        Tester mon empreinte sur le climat
                        <Image
                          src="/images/nosgestesclimat.png"
                          width={80}
                          height={80}
                          alt=""
                          objectFit="contain"
                          className={styles.elecPopupImg}
                        />
                      </div>
                    </div>
                  </Popup>
                </Marker>
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Réseau stockage">
              <LayerGroup>
                <Marker position={[2, -135]} icon={stockage}>
                  <Popup width={90}>
                    <b>Point du réseau de stockage</b>
                  </Popup>
                </Marker>
                <Marker position={[-2, 130]} icon={stockage}>
                  <Popup width={90}>
                    <b>Point du réseau de stockage</b>
                  </Popup>
                </Marker>
                <Marker position={[61, -119]} icon={stockage}>
                  <Popup width={90}>
                    <b>Point du réseau de stockage</b>
                  </Popup>
                </Marker>
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
};
export default Map;
