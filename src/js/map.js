import {
    L,
    AutoGraticule,
    markerImg,
    shadowImg,
    SimpleMapScreenshoter
} from './leaflet';

import { geojson, geojson2 } from './geojson';
import { points } from './points';

const map = L.map('map', {
    // maxZoom: 5
}).setView([51.505, -0.09], 13);

// plugins

// sidebar
const sidebar = L.control.sidebar('sidebar');
map.addControl(sidebar);


// scale
const scale = L.control.graphicScale({
    fill: 'hollow',
    doubleLine: true,
    labelPlacement: 'auto',
    position: 'bottomright'
}).addTo(map);


// coordinates

const coordinatesControl = L.control.coordinates({
    position: 'bottomleft',
    latitudeText: 'Latitud',
    longitudeText: 'Longitud',
    promptText: 'Presione Ctrl+C para copiar las coordenadas',
    precision: 6
}).addTo(map);

map.on('mousemove', (evento) => {
    coordinatesControl.setCoordinates(evento);
})

// minimap
const miniBaseMap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})
const miniBaseMap2 = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

const minimap = new L.Control.MiniMap(miniBaseMap, {
    width: 100,
    height: 100,
    zoomLevelOffset: -8,
    position: 'bottomleft'
}).addTo(map);

minimap.disableInteractivity();

setTimeout(() => {
    minimap.changeLayer(miniBaseMap2);
}, 3000)

// graticule

new AutoGraticule({
    minDistance: 200
}).addTo(map);


// easyButton

const houseBtn = L.easyButton('fa-solid fa-house', () => {
    map.flyTo([3.918428, -76.255494])
})

const coordsBtn = L.easyButton('fa-solid fa-location-crosshairs', () => {
    const {lat, lng} = marcador.getLatLng();
    const contenido = `
        <h1>Las coordenadas son:</h1>
        <h3>Latitud: ${lat}</h3>
        <h3>Longitud: ${lng}</h3>
    `
    marcador.bindPopup(contenido).openPopup();
})

L.easyBar([ houseBtn, coordsBtn ]).addTo(map);

L.easyButton('fa-solid fa-comment', () => {
    console.log('soy un botón independiente')
}).addTo(map)

// measure

const options = {
    position: 'topleft',            // Position to show the control. Values: 'topright', 'topleft', 'bottomright', 'bottomleft'
    unit: 'metres',                 // Show imperial or metric distances. Values: 'metres', 'landmiles', 'nauticalmiles'
    clearMeasurementsOnStop: true,  // Clear all the measurements when the control is unselected
    showBearings: false,            // Whether bearings are displayed within the tooltips
    bearingTextIn: 'In',             // language dependend label for inbound bearings
    bearingTextOut: 'Out',          // language dependend label for outbound bearings
    tooltipTextFinish: 'Clic para <b>finalizar</b><br>',
    tooltipTextDelete: 'Presionar SHIFT y clic para <b>borrar punto</b>',
    tooltipTextMove: 'Clic y sostener para <b>mover punto</b><br>',
    tooltipTextResume: '<br>Press CTRL-key and click to <b>resume line</b>',
    tooltipTextAdd: 'Press CTRL-key and click to <b>add point</b>',
                                    // language dependend labels for point's tooltips
    measureControlTitleOn: 'Clic para iniciar dibujo',   // Title for the control going to be switched on
    measureControlTitleOff: 'Clic para finalizar dibujo', // Title for the control going to be switched off
    measureControlLabel: '&#8614;', // Label of the Measure control (maybe a unicode symbol)
    measureControlClasses: [],      // Classes to apply to the Measure control
    showClearControl: true,        // Show a control to clear all the measurements
    clearControlTitle: 'Borrar mediciones', // Title text to show on the clear measurements control button
    clearControlLabel: '&times',    // Label of the Clear control (maybe a unicode symbol)
    clearControlClasses: [],        // Classes to apply to clear control button
    showUnitControl: true,         // Show a control to change the units of measurements
    distanceShowSameUnit: false,    // Keep same unit in tooltips in case of distance less then 1 km/mi/nm
    unitControlTitle: {             // Title texts to show on the Unit Control button
        text: 'Change Units',
        metres: 'metres',
        landmiles: 'land miles',
        nauticalmiles: 'nautical miles'
    },
    unitControlLabel: {             // Unit symbols to show in the Unit Control button and measurement labels
        metres: 'm',
        kilometres: 'km',
        feet: 'ft',
        landmiles: 'mi',
        nauticalmiles: 'nm'
    },
    tempLine: {                     // Styling settings for the temporary dashed line
        color: '#00f',              // Dashed line color
        weight: 2                   // Dashed line weight
    },          
    fixedLine: {                    // Styling for the solid line
        color: '#006',              // Solid line color
        weight: 2                   // Solid line weight
    },
    startCircle: {                  // Style settings for circle marker indicating the starting point of the polyline
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#0f0',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
    },
    intermedCircle: {               // Style settings for all circle markers between startCircle and endCircle
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#ff0',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
    },
    currentCircle: {                // Style settings for circle marker indicating the latest point of the polyline during drawing a line
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#f0f',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
    },
    endCircle: {                    // Style settings for circle marker indicating the last point of the polyline
        color: '#000',              // Color of the border of the circle
        weight: 1,                  // Weight of the circle
        fillColor: '#f00',          // Fill color of the circle
        fillOpacity: 1,             // Fill opacity of the circle
        radius: 3                   // Radius of the circle
    },
};

L.control.polylineMeasure(options).addTo(map);


// draw

L.drawLocal.draw.toolbar.buttons.polygon = 'Dibujar un polígono!';
L.drawLocal.draw.toolbar.buttons.marker = 'Dibujar un marcador!';
L.drawLocal.draw.toolbar.buttons.polyline = 'Dibujar una línea!';
L.drawLocal.draw.toolbar.buttons.rectangle = 'Dibujar un rectangulo!';
L.drawLocal.draw.toolbar.buttons.circlemarker = 'Dibujar un circleMarker!';


L.drawLocal.draw.handlers.polygon.tooltip.start = 'Clic para añadir vertice';


const featureGroup = new L.FeatureGroup();

// featureGroup,addTo(map);
map.addLayer(featureGroup);
    
// var MyCustomMarker = L.Icon.extend({
//     options: {
//         shadowUrl: null,
//         iconAnchor: new L.Point(12, 12),
//         iconSize: new L.Point(24, 24),
//         iconUrl: 'link/to/image.png'
//     }
// });
    
const drawOptions = {
    position: 'topright',
    draw: {
        polyline: {
            shapeOptions: {
                color: '#f357a1',
                weight: 10
            }
        },
        polygon: {
            allowIntersection: false, // Restricts shapes to simple polygons
            drawError: {
                color: '#e1e100', // Color the shape will turn when intersects
                message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
            },
            shapeOptions: {
                color: '#bada55'
            }
        },
        circle: false, // Turns off this drawing tool
        rectangle: {
            shapeOptions: {
                clickable: false
            }
        },
        marker: {
            icon: L.icon({
                iconUrl:markerImg,
                shadowUrl: shadowImg,
                iconSize: [30, 45],
                iconAnchor: [15, 45],
                popupAnchor: [0, -45],
            })
        }
    },
    edit: {
        featureGroup: featureGroup, //REQUIRED!!
        remove: false
    }
};

const drawControl = new L.Control.Draw(drawOptions);
map.addControl(drawControl);

map.on(L.Draw.Event.CREATED, function (e) {
    const layer = e.layer;
    //     layer = e.layer;

    // if (type === 'marker') {
    //     layer.bindPopup('A popup!');
    // }

    featureGroup.addLayer(layer);
});

// GPS
const gpsControl = new L.Control.Gps({
    autoActive: false,
    autoCenter: true,
    style: {
        radius: 5,
        color: 'black',
        fillColor: 'yellow'
    },
    title: 'Centrar mapa en tu ubicación'
})

map.addControl( gpsControl );

setTimeout(()=>[
    console.log(gpsControl.getLocation())
], 3000)

// GEOCODER

const geocoder = L.Control.geocoder({
    defaultMarkGeocode: true
}).addTo(map);

geocoder.on('markgeocode', function(e) {
    const bbox = e.geocode.bbox;
    const poly = L.polygon([
      bbox.getSouthEast(),
      bbox.getNorthEast(),
      bbox.getNorthWest(),
      bbox.getSouthWest()
    ]).addTo(map);
    map.fitBounds(poly.getBounds());
})


// BOUNCING

// setTimeout(() => {

//     marcador.bounce({
//         duration: 2000, 
//         height: 100,
//         loop: 3
//     }, () => {
//         alert('He terminado de saltars')
//     })

// }, 3000)

// SCREENSHOTER

const screenShoter = new SimpleMapScreenshoter({
    hidden: false
}).addTo(map)


// setTimeout(() => {
//     screenShoter.takeScreen('image', {
//         mimeType: 'image/jpeg'
//     }).then(blob => {
//         console.log(blob)
//      }).catch(e => {
//         console.error(e)
//      })
// }, 3000)

// clasificación

const geojsonLayer = L.geoJSON(geojson, {
    style: (feature) => {
        const { valor } = feature.properties;
        
        if(valor === 1){
            return { color: 'red'}
        }
        else if( valor === 2 ){
            return { color: 'green'}
        }
        else if( valor === 3 ){
            return { color: 'blue'}
        }
    }
}).addTo(map)

map.fitBounds(geojsonLayer.getBounds());


// choropleth

L.choropleth(geojson2, {
    valueProperty: 'valor', // which property in the features to use
    scale: ['blue', 'red'], // chroma.js scale - include as many as you like
    steps: 2, // number of breaks or steps in range
    mode: 'k', // q for quantile, e for equidistant, k for k-means
    style: {
        color: '#fff', // border color
        weight: 2,
        fillOpacity: 0.3
    },
    
}).addTo(map)

// geojson


// const pointsLayer = L.geoJSON(points).addTo(map);


// map.fitBounds(pointsLayer.getBounds());


// markercluster

const cluster = L.markerClusterGroup({
    showCoverageOnHover: false
});
// map.addLayer(cluster);

points.features.forEach((feature) => {
    const [ lat, lng ] = feature.geometry.coordinates;
    const marcador = L.marker([lat, lng]);
    cluster.addLayer(marcador);
})


// HEAT

const data = points.features.map((feature) => {
    const [ lat, lng ] = feature.geometry.coordinates;
    return [
        lat, lng, 1
    ]
})

// const heatLayer = L.heatLayer(data, { 
//     radius: 45, 
//     gradient : {
//         0.4: 'blue', 
//         0.65: 'lime', 
//         1: 'black'
//     } 
// }).addTo(map);


// MIGRATION


const migrationData = [
    {
        labels: ['CIUDAD1', 'CIUDAD2'],
        from: [ -72.064278327865, 0.09426054434347009],
        to: [-69.23614524560176,2.7661123945074024],
        color: 'red',
        value: 1,
    },
    {
        labels: ['CIUDAD1', 'CIUDAD3'],
        from: [ -72.064278327865, 0.09426054434347009],
        to: [-75.46976060769794, 6.3503037201283945],
        color: 'red',
        value: 100,
    },
    {
        labels: ['CIUDAD1', 'CIUDAD4'],
        from: [ -72.064278327865, 0.09426054434347009],
        to: [-71.12954646244216, 6.402154360901079],
        color: 'blue',
        value: 10,
    },
];

const migrationoptions = {
    marker: {
        radius: [5, 10],
        pulse: true,
        textVisible: true
    },
    line: {
        width: 1,
        order: false,
        icon: {
            type: 'arrow',
            imgUrl: '',
            size: 20
        },
    },
}

const migrationLayer = L.migrationLayer(migrationData, migrationoptions);
migrationLayer.addTo(map)


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const marcador = L.marker([51.505, -0.09], {
    draggable: true
}).addTo(map);


marcador.on('click', (e) => {
    sidebar.toggle();
})

marcador.on('drag', (e) => {
    const { lat, lng } = marcador.getLatLng();
    sidebar.setContent(`
        <h1> LAS COORDENADAS DEL PUNTO SON: </h1>
        <h3>Latitud: ${lat}</h3>
        <h3>Longitud: ${lng}</h3>
    `)
})


