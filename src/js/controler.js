import * as model from "./model.js";
import view from "./view.js";
import { timeout } from "./helper.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import L, { icon, Renderer } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MAP_ZOOM } from "./config.js";
import dotenv from "donenv";

const ipTracker = function () {
  dotenv.config();
  let map;
  let myIcon;

  const loadMap = function (latlng) {
    if (!map) {
      map = L.map("map", {
        zoomControl: false,
      }).setView(latlng, MAP_ZOOM);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      myIcon = L.divIcon({
        html: `<svg xmlns="http://www.w3.org/2000/svg" width="46" height="56"><path fill-rule="evenodd" d="M39.263 7.673c8.897 8.812 8.966 23.168.153 32.065l-.153.153L23 56 6.737 39.89C-2.16 31.079-2.23 16.723 6.584 7.826l.153-.152c9.007-8.922 23.52-8.922 32.526 0zM23 14.435c-5.211 0-9.436 4.185-9.436 9.347S17.79 33.128 23 33.128s9.436-4.184 9.436-9.346S28.21 14.435 23 14.435z"/></svg>`,
        className: "custom-div-icon",
        iconSize: [46, 56],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76],
      });
      L.marker(latlng, { icon: myIcon }).addTo(map);
    } else {
      map.setView(latlng, MAP_ZOOM);
      L.marker(latlng, { icon: myIcon }).addTo(map);
    }
  };

  const controlLoadYourIp = async function () {
    try {
      const data = await model.getIp();
      if (!data) return;
      view._renderData(data);
      loadMap(data.latlng);
    } catch (err) {
      console.error(err);
      view._renderError(err);
    }
  };

  const controlGetIp = async function (query) {
    try {
      const data = await model.sendIp(query);
      if (!data) return;
      view._renderData(data);
      loadMap(data.latlng);
    } catch (err) {
      console.error(err);
      view._renderError(err);
    }
  };

  const init = function () {
    controlLoadYourIp();
    view._addHandlerSearch(controlGetIp);
  };
  init();
};

ipTracker();
