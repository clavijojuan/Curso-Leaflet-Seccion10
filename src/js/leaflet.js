// images
import shadowImg from '../../node_modules/leaflet/dist/images/marker-shadow.png';
import markerImg from '../../node_modules/leaflet/dist/images/marker-icon.png';

// css
import '../../node_modules/leaflet/dist/leaflet.css';
import '../../node_modules/leaflet-sidebar/src/L.Control.Sidebar.css';
import '../../node_modules/leaflet-graphicscale/dist/Leaflet.GraphicScale.min.css';
import '../../node_modules/leaflet-control-mini-map/dist/minimap.min.css';
import '../../node_modules/leaflet-coordinates-control/src/L.Control.Coordinates.css';
import '../../node_modules/leaflet-easybutton/src/easy-button.css';
import '../../node_modules/leaflet.polylinemeasure/Leaflet.PolylineMeasure.css';
import '../../node_modules/leaflet-draw/dist/leaflet.draw.css';
import '../../node_modules/leaflet-gps/dist/leaflet-gps.min.css';
import '../../node_modules/leaflet-control-geocoder/dist/Control.Geocoder.css';
import '../../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css';

// js
import * as L from 'leaflet';
import 'leaflet-sidebar';
import 'leaflet-graphicscale';
import 'leaflet-control-mini-map';
import 'leaflet-coordinates-control';
import AutoGraticule from 'leaflet-auto-graticule';
import 'leaflet-easybutton';
import 'leaflet.polylinemeasure';
import 'leaflet-draw';
import 'leaflet-gps';
import 'leaflet-control-geocoder';
import '@skyraptor/leaflet.bouncemarker';
import {SimpleMapScreenshoter} from 'leaflet-simple-map-screenshoter';
import 'leaflet-choropleth/dist/choropleth.js';
import 'leaflet.markercluster';
import 'leaflet.heat';
import 'leaflet.migration';

L.Marker.prototype.setIcon(
    L.icon({
        iconUrl:markerImg,
        shadowUrl: shadowImg,
        iconSize: [30, 45],
        iconAnchor: [15, 45],
        popupAnchor: [0, -45],
    })
);

export {
    L,
    AutoGraticule,
    markerImg,
    shadowImg,
    SimpleMapScreenshoter,
}