import styles from "../styles/Map.module.css";
import Image from "next/image";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import L, { latLngBounds, Icon } from "leaflet";
import { useRef, useMemo, useState, useEffect } from "react";
import DraggableMarker from "./DraggableMarker";
import * as mapData from "../public/data/dummydata.json";
import Link from "next/link";
import Legend from "./Legend";

const lightBulb = new Icon({
  iconUrl: "images/light-bulb_icon_small.png",
  iconSize: [70, 70],
});

const stockage = new Icon({
  iconUrl: "images/stockage_icon.png",
  iconSize: [70, 70],
});

const Map = ({
  setShowModal,
  showModal,
  mapUrl,
  setMapUrl,
  mapId,
  setMapId,
}) => {
  // Variables
  const map = useRef();
  const tileLayer = useRef();
  const [activePopup, setActivePopup] = useState(null);
  // const mapSW = [0, 4096],
  //   mapNE = [4096, 0];

  const handleClick = (e) => {
    e.preventDefault();
    setShowModal(true);
  };
  useEffect(() => {
    if (tileLayer.current) {
      tileLayer.current.setUrl(mapData.tilesMaps[mapId].mapUrl);
    }
    console.log(mapUrl);
  }, [mapId]);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Try me</h1>
      </div>
      <div className={styles.mapWrapper}>
        <Legend
          mapId={mapId}
          setMapId={setMapId}
          mapUrl={mapUrl}
          setMapUrl={setMapUrl}
        />
        <MapContainer
          ref={map}
          center={mapData.tilesMaps[mapId].center}
          zoom={2}
          scrollWheelZoom={true}
          zoomControl={false}
          // maxBounds={latLngBounds(NE, SW)}
          // maxBounds={latLngBounds([-76, -180], [76, 180])}
          maxBounds={
            mapData.tilesMaps[mapId].crs
              ? latLngBounds(
                  mapData.tilesMaps[mapId].maxBounds[0],
                  mapData.tilesMaps[mapId].maxBounds[1]
                )
              : [
                  [-76, -180],
                  [76, 180],
                ]
          }
        >
          <TileLayer
            ref={tileLayer}
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
            minZoom="1"
            maxZoom="4"
            continuousWorld={false}
            noWrap={true}
            crs={mapData.tilesMaps[mapId].crs ? L.CRS.Simple : null}
          />

          <LayersControl position="topright">
            <LayersControl.Overlay checked name=" Draggable position-marker">
              <DraggableMarker />
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Réseau électrique">
              <LayerGroup>
                {mapData.consumeFeatures.map((consumePoint) => (
                  <Marker
                    position={consumePoint.geometry.coordinates}
                    icon={lightBulb}
                    key={consumePoint.properties.ID}
                  >
                    <Popup
                      width={90}
                      position={consumePoint.geometry.coordinates}
                    >
                      <div className={styles.elecPopupWrapper}>
                        <b>{consumePoint.properties.NAME}</b>
                        <br />
                        <div
                          className={styles.elecPopupLink}
                          onClick={handleClick}
                        >
                          {consumePoint.properties.DESCRIPTIO}
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
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
            <LayersControl.Overlay checked name="Réseau stockage">
              <LayerGroup>
                {mapData.stockageFeatures.map((stockPoint) => (
                  <Marker
                    position={stockPoint.geometry.coordinates}
                    icon={stockage}
                    key={stockPoint.properties.ID}
                  >
                    <Popup
                      width={90}
                      position={stockPoint.properties.coordinates}
                    >
                      <b>{stockPoint.properties.NAME}</b>
                    </Popup>
                  </Marker>
                ))}
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
};
export default Map;
