async function main() {

var _mapboxGlControls = require("mapbox-gl-controls");

var version = "v1.4.0";

const loaderDiv = document.getElementById('loader-div');

// URL Stuff //

var url_string = window.location.href;
var url = new URL(url_string);
var location = url.searchParams.get("latlng");
var redirect = url.searchParams.get("redirect");

// LOGGING //
var colors = {
	"gray": "font-weight: bold; color: #1B2B34;",
	"red": "font-weight: bold; color: #EC5f67;",
	"orange": "font-weight: bold; color: #F99157;",
	"yellow": "font-weight: bold; color: #FAC863;",
	"green": "font-weight: bold; color: #99C794;",
	"teal": "font-weight: bold; color: #5FB3B3;",
	"blue": "font-weight: bold; color: #6699CC;",
	"purple": "font-weight: bold; color: #C594C5;",
	"brown": "font-weight: bold; color: #AB7967;"
}

console.log('%cThe Rail Map %c' + version + '!', colors.black, colors.yellow);
console.log('%cCreated by %cEliot Hertenstein', colors.black, colors.blue);
console.log('%cSupport Me at these places:', colors.black);
console.log('%cYouTube: %chttps://www.youtube.com/channel/UCMgxeBL7wpBOjhVHBluvTrQ', colors.red, colors.black);
console.log('%cPatreon: %chttps://www.patreon.com/eliothertenstein', colors.purple, colors.black);

// Mapbox Stuff //

var style = 'mapbox://styles/dotly/ckoxhacbh01n417tdqjw1evgy';

mapboxgl.accessToken = 'pk.eyJ1IjoiZG90bHkiLCJhIjoiY2tpbnA0YjljMTVhcTM0cGVzYjZibzEyMSJ9.fmuvKLVnmue6RxfqZjeLPQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: style,
  center: [-96, 37.8],
  zoom: 3 

});

var mapStyle = 'usa';

class LocationControl { 
  onAdd(map) {
  this._map = map;
  this._container = document.createElement('div');
  this._container.className = 'mapboxgl-ctrl mapbox-location-control';
  this._container.innerHTML = '<div class="mapboxgl-ctrl-group"> <button class="custom-icon" type="button" title="Europe" aria-label="Europe" aria-pressed="false"><svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 600 600"><path d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"/></svg> </button> </div>';
  this._container.addEventListener('click', function(e) {
    toggleLocation();
  }, false)

  return this._container;
  }
   
  onRemove() {
  this._container.parentNode.removeChild(this._container);
  this._map = undefined;
  }
};

class AmtrakControl { 
  onAdd(map) {
  this._map = map;
  this._container = document.createElement('div');
  this._container.className = 'mapboxgl-ctrl mapbox-amtrak-control';
  this._container.innerHTML = '<div class="mapboxgl-ctrl-group"> <button class="custom-icon" type="button" title="Amtrak" aria-label="Amtrak" aria-pressed="false"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 600 600"><path d="M264.437 173.779C233.5 172.323 71.9 168.216 0 199.364c19.446 11.487 40.304 23.404 64.792 36.321 71.256-33.337 163.7-45.394 248.716-50.033v-2.16c-16.531-2.019-34.781-5.55-49.071-9.712h0zm72.648 13.067c-63.789 6.367-176.712 24.86-241.056 64.925 23.396 11.771 47.86 23.425 72.302 34.315 67.746-57.756 157.356-83.371 248.673-101.323v-2.117c-23.202 2.729-58.256 4.398-79.919 4.2h0zM201.977 300.554c30.862 12.76 62.789 24.496 89.985 32.34 32.769-65.137 92.008-116.773 201.187-164.091v-2.135c-140.237 38.346-227.993 65.821-291.172 133.887h0z"/> </svg> </button> </div>';
  this._container.addEventListener('click', function(e) {
    amtrakSwitch();
  }, false)

  return this._container;
  }
   
  onRemove() {
  this._container.parentNode.removeChild(this._container);
  this._map = undefined;
  }
};

class TrainControl { 
  onAdd(map) {
  this._map = map;
  this._container = document.createElement('div');
  this._container.className = 'mapboxgl-ctrl mapbox-train-control';
  this._container.innerHTML = '<div class="mapboxgl-ctrl-group"> <button class="custom-icon" type="button" title="Trains" aria-label="Trains" aria-pressed="false"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 600 600"><path xmlns="http://www.w3.org/2000/svg" d="M90 160q77-42 145-53h30q68 11 145 53V75Q250-27.5 90 75zM78 338q0 20 20 20h304q20 0 20-20V200q0-15-20-30-69-40-137-50h-30q-68 10-137 50-20 15-20 30zm32 32v85q0 10 15 20l35 13 30-88h120l30 88 35-13q15-10 15-20v-85zm196 45H198l-25 80q77 10 154 0l-25-80z"/> </svg> </button> </div>';
  this._container.addEventListener('click', function(e) {
    toggleTrains();
  }, false)

  return this._container;
  }
   
  onRemove() {
  this._container.parentNode.removeChild(this._container);
  this._map = undefined;
  }
};

class AboutControl { 
  onAdd(map) {
  this._map = map;
  this._container = document.createElement('div');
  this._container.className = 'mapboxgl-ctrl';
  this._container.innerHTML = '<div class="mapboxgl-ctrl-group"> <button class="custom-icon" type="button" title="About" aria-label="About" aria-pressed="false"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 600 600"><path d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"/> </svg> </button> </div>';
  this._container.addEventListener('click', function(e) {
    aboutMap();
  }, false)

  return this._container;
  }
   
  onRemove() {
  this._container.parentNode.removeChild(this._container);
  this._map = undefined;
  }
};

const navigationControl = new mapboxgl.NavigationControl()
const fullscreenControl = new mapboxgl.FullscreenControl()
const aboutControl = new AboutControl(); 
const locationControl = new LocationControl(); 
const amtrakControl = new AmtrakControl();
const trainControl = new TrainControl();
const usStyleControl = new _mapboxGlControls.StylesControl({
  css: 'style-id-usa',
  styles: [{
    label: 'Satellite',
    styleName: 'Satellite',
    styleUrl: 'mapbox://styles/dotly/ckoxhacbh01n417tdqjw1evgy'
  }, {
    label: 'Light',
    styleName: 'Light',
    styleUrl: 'mapbox://styles/dotly/ckoz6vsl50kv117pg6tbt6icm'
  }, {
    label: 'Data',
    styleName: 'Data',
    styleUrl: 'mapbox://styles/dotly/ckoz5zgci1o3617nb0fiz48ig'
  }],
  onChange: style => console.log(style)
});
const euStyleControl = new _mapboxGlControls.StylesControl({
  css: 'style-id-europe',
  styles: [{
    label: 'Satellite',
    styleName: 'Satellite',
    styleUrl: 'mapbox://styles/dotly/ckpnekd8308ff18t4n0cc1jo3'
  }, {
    label: 'Light',
    styleName: 'Light',
    styleUrl: 'mapbox://styles/dotly/ckpxomwzq0syt17nzenb4p17r'
  }, {
    label: 'Data',
    styleName: 'Data',
    styleUrl: 'mapbox://styles/dotly/ckpxomzkq08gp19o8o99y0yut'
  }],
  onChange: style => console.log(style)
});
const mapboxGeocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
  collapsed: true,
  marker: false
});

map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
}));
map.addControl(usStyleControl, 'top-left');  
map.addControl(euStyleControl, 'top-left');  
map.addControl(mapboxGeocoder, 'top-left');
map.addControl(navigationControl);
map.addControl(fullscreenControl);
map.addControl(locationControl); 
map.addControl(amtrakControl);
map.addControl(trainControl);
map.addControl(aboutControl); 

var locationButton = document.getElementsByClassName('mapbox-location-control');
var amtrakButton = document.getElementsByClassName('mapbox-amtrak-control');
var styleButton = document.getElementsByClassName('mapbox-control-styles');
var trainButton = document.getElementsByClassName('mapbox-train-control');

var usStyleButton = styleButton[0];
var euStyleButton = styleButton[1];

euStyleButton.classList.add('hidden-button');

var modal = document.getElementById("aboutPopup");

function aboutMap() {
  if (modal.style.display == "block") {
    modal.style.display = "none";
  }
  else {
    modal.style.display = "block";
  };
};

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// REDIRECT HANDLER

if (redirect == 'europe') {
  map.setStyle('mapbox://styles/dotly/ckpnekd8308ff18t4n0cc1jo3');
  mapStyle = 'europe';
  amtrakButton[0].classList.add('hidden-button');
  trainButton[0].classList.add('hidden-button');
  usStyleButton.classList.add('hidden-button');
  euStyleButton.classList.remove('hidden-button');
  map.flyTo({
    center: [14,50.3],
    zoom: 3.5,
    essential: true
  })
} else if (redirect == 'amtrak') {
  map.setStyle('mapbox://styles/dotly/ckqim4kef1ubg18pjg02v9zxp');
  mapStyle = 'amtrak';
  locationButton[0].classList.add('hidden-button');
  styleButton[0].classList.add('hidden-button');
};

// AMTRAK DATA HANDLER

async function getTrains(updateSource) {
  // Make a GET request to the API and return the location of the trains.
  try {
      const response = await fetch(
          'https://api.amtrak.cc/v1/trains',
          { method: 'GET' }
      );
      const trains = await response.json();
      // returns object of trains with the object num as the train number

      // create a geoJSON object
      const geoJSON = {
          type: 'FeatureCollection',
          features: []
      };
      
      // iterate through trains
      Object.keys(trains).forEach(key => {
          const activeTrains = trains[key];

          // iterate through active trains
          Object.keys(activeTrains).forEach(key => {
              const train = activeTrains[key];
              // push train to geoJSON
              geoJSON.features.push({
                  type: 'Feature',
                  geometry: {
                      type: 'Point',
                      coordinates: [train.lon, train.lat]
                  },
                  properties: train
                });
          });
      });

      return geoJSON;
      
  } catch (err) {
      // If the updateSource interval is defined, clear the interval to stop updating the source.
      if (updateSource) clearInterval(updateSource);
      throw new Error(err);
  }
};

const geojson = await getTrains();

// Update the source from the API every minute
const updateSource = setInterval(async () => {
  console.log('updating trains');
  const geojson = await getTrains(updateSource);
  try {
    map.getSource('trains').setData(geojson);
  } catch (err) {
    console.log(`Trains Layer Not Loaded - Won't Update`);
  };
}, 60000);

// add source to map

map.addSource('trains', {
  type: 'geojson',
  data: geojson
});

// LOCATION HANDLER

function toggleLocation() {
  if (mapStyle !== 'europe') {
    switchLocation('europe');
  }
  else {
    switchLocation('usa');
  };
};

function switchLocation(location) {
  if (location == 'europe') {
    map.setStyle('mapbox://styles/dotly/ckpnekd8308ff18t4n0cc1jo3');
    mapStyle = 'europe';
    amtrakButton[0].classList.add('hidden-button');
    trainButton[0].classList.add('hidden-button');
    usStyleButton.classList.add('hidden-button');
    euStyleButton.classList.remove('hidden-button');
    map.flyTo({
      center: [14,50.3],
      zoom: 3.5,
      essential: true
    })
  } else if (location == 'usa') {
    map.setStyle('mapbox://styles/dotly/ckoxhacbh01n417tdqjw1evgy');
    mapStyle = 'usa';
    amtrakButton[0].classList.remove('hidden-button');
    trainButton[0].classList.remove('hidden-button');
    euStyleButton.classList.add('hidden-button');
    usStyleButton.classList.remove('hidden-button');
    map.flyTo({
      center: [-96, 37.8],
      zoom: 3,
      essential: true
    });    
    displayAmtrak();
  };
}

function amtrakSwitch() {
  if (mapStyle != 'amtrak') {
    map.setStyle('mapbox://styles/dotly/ckqim4kef1ubg18pjg02v9zxp');
    mapStyle = 'amtrak';
    locationButton[0].classList.add('hidden-button');
    styleButton[0].classList.add('hidden-button');
  }   
  else {
    map.setStyle('mapbox://styles/dotly/ckoxhacbh01n417tdqjw1evgy');
    mapStyle = 'usa';
    locationButton[0].classList.remove('hidden-button');
    styleButton[0].classList.remove('hidden-button');
  };      
};

async function displayAmtrak() {
  // check for 'trains' source, if not, add it
  if (map.getSource('trains') == undefined) {
    map.addSource('trains', {
      type: 'geojson',
      data: geojson
    });
  };

  if (map.getLayer('trains') == undefined) {
  
    // Add the dots to the map.
    map.addLayer({
        'id': 'trains',
        'type': 'circle',
        'source': 'trains',
        "paint": {
          "circle-color": "hsl(203, 68%, 29%)",
          "circle-radius": 11,
          "circle-opacity": 1
        }
    });
    // Add the labels to the map.
    map.addLayer({
      'id': 'train-numbers',
      'type': 'symbol',
      'source': 'trains',
      'layout': {
        'text-field': ["to-string", ["get", "trainNum"]],
        'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
        'text-size': 12,
      },
      'paint': {
        'text-color': '#fff',
      }
    });
  };
};

function toggleTrains() {
// toggle visibility of train and train number layers using map.setLayoutProperty()
  if (map.getLayoutProperty('trains', 'visibility') === 'none') {
    map.setLayoutProperty('trains', 'visibility', 'visible');
    map.setLayoutProperty('train-numbers', 'visibility', 'visible');
  } else {
    map.setLayoutProperty('trains', 'visibility', 'none');
    map.setLayoutProperty('train-numbers', 'visibility', 'none');
  };
};

window.onload = function() {
  if (location != null) {
    var latLng = location.split(","); 
    var lat = parseFloat(latLng[0]);
    var lng = parseFloat(latLng[1]); 
    map.flyTo({
      center: [lng,lat],
      zoom: 18,
      essential: true
    })
  };
};

map.on('load', async function () {
  var hoverpopup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: "hover",
    offset: 10
  }); 

  displayAmtrak();
  
  ///////////////////
  // UNITED STATES //
  ///////////////////
  // Rail //
  // On Click

  map.on('click', 'Railroad-Crossings', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var crossingid = e.features[0].properties.CROSSING;
    var milepost = e.features[0].properties.MILEPOST;
    var railroad = e.features[0].properties.RAILROAD;
    var div = e.features[0].properties.RRDIV;
    var subdiv = e.features[0].properties.RRSUBDIV;
    var street = e.features[0].properties.STREET; // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    var zoom = map.getZoom();

    const table = [
      `<tr><td>Railroad</td><td>${railroad}</td></tr>`, 
      `<tr><td>Division</td><td>${div}</td></tr>`,
      `<tr><td>Subdivision</td><td>${subdiv}</td></tr>`,
      `<tr><td>Street</td><td>${street}</td></tr>`,
      `<tr><td>Crossing ID</td><td>${crossingid}</td></tr>`,
      `<tr><td>Milepost</td><td>${milepost}</td></tr>`,
      `<tr><td>Link</td><td><a href='https://www.therailmap.com?latlng=${coordinates[1]},${coordinates[0]}' target='_blank'>Click Me</a></td></tr>`
    ].join('');

    if (zoom > 11) {
      new mapboxgl.Popup({
        closeButton: false,
        offset: 10
      }).setLngLat(coordinates).setHTML(`<table><thead><tr><th>Name</th><th>Value</th></tr></thead>${table}<tbody></tbody></table>`).addTo(map);
    }

    hoverpopup.remove();
  }); // On Hover

  map.on('mouseenter', 'Railroad-Crossings', function (e) {
    var zoom = map.getZoom();

    if (zoom > 11) {
      map.getCanvas().style.cursor = 'pointer';

      function convertCase(str) {
        var lower = String(str).toLowerCase();
        return lower.replace(/(^| )(\w)/g, function (x) {
          return x.toUpperCase();
        });
      }

      var coordinates = e.features[0].geometry.coordinates.slice();
      var crossingid = e.features[0].properties.CROSSING;
      var milepost = e.features[0].properties.MILEPOST;
      var railroad = e.features[0].properties.RAILROAD;
      var div = e.features[0].properties.RRDIV;
      var subdiv = e.features[0].properties.RRSUBDIV;
      var streetraw = e.features[0].properties.STREET;
      var pos = e.features[0].properties.POSXING;
      var street = convertCase(streetraw); // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      hoverpopup.setLngLat(coordinates).setHTML("<b>" + street + "</b>").addTo(map);
    }

    ;
  }); // On Leave

  map.on('mouseleave', 'Railroad-Crossings', function () {
    map.getCanvas().style.cursor = '';
    hoverpopup.remove();
  }); // Bridge //
  // On Click

  map.on('click', 'Railroad-Bridges', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var id = e.features[0].properties.ID;
    var railroad = e.features[0].properties.RAILWAY_NM;
    var brname = e.features[0].properties.NAME; // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    var zoom = map.getZoom();

    const table = [
      `<tr><td>Railroad</td><td>${railroad}</td></tr>`,
      `<tr><td>Division</td><td>${div}</td></tr>`,
      `<tr><td>Subdivision</td><td>${subdiv}</td></tr>`,
      `<tr><td>Street</td><td>${street}</td></tr>`,
      `<tr><td>Crossing ID</td><td>${crossingid}</td></tr>`,
      `<tr><td>Milepost</td><td>${milepost}</td></tr>`,
      `<tr><td>Link</td><td><a href='https://www.therailmap.com?latlng=${coordinates[1]},${coordinates[0]}' target='_blank'>Click Me</a></td></tr>`
    ].join('');

    if (zoom > 11) {
      new mapboxgl.Popup({
        closeButton: false,
        offset: 10
      })
        .setLngLat(coordinates)
        .setHTML(`<table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody>${table}</tbody></table>`)
        .addTo(map);
    }

    ;
    hoverpopup.remove();
  }); // On Hover

  map.on('mouseenter', 'Railroad-Bridges', function (e) {
    var zoom = map.getZoom();

    if (zoom > 11) {
      map.getCanvas().style.cursor = 'pointer';

      function convertCase(str) {
        var lower = String(str).toLowerCase();
        return lower.replace(/(^| )(\w)/g, function (x) {
          return x.toUpperCase();
        });
      }

      var coordinates = e.features[0].geometry.coordinates.slice();
      var nameraw = e.features[0].properties.NAME;
      var name = convertCase(nameraw); // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      hoverpopup.setLngLat(coordinates).setHTML("<b>" + name + "</b>").addTo(map);
    }

    ;
  }); // On Leave

  map.on('mouseleave', 'Railroad-Bridges', function () {
    map.getCanvas().style.cursor = '';
    hoverpopup.remove();
  }); ////////////
  // CANADA //
  ////////////
  // Rail //
  // On Click

  map.on('click', 'CN-Railroad-Crossings', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var access = e.features[0].properties.Access;
    var railroad = e.features[0].properties.Railway;
    var subdiv = e.features[0].properties.Subdivision;
    var location = e.features[0].properties.Location;
    var lanes = e.features[0].properties.Lanes; //NEW
    var milepost = e.features[0].properties.Mile; //NEW
    var authority = e.features[0].properties['Road Authority']; //NEW
    var road_speed = e.features[0].properties['Road Speed (km/h)']; //NEW
    var trains_daily = e.features[0].properties['Total Trains Daily']; //NEW
    var vehicles_daily = e.features[0].properties['Vehicles Daily']; //NEW
    var train_speed = e.features[0].properties['Train Max Speed (mph)']; //NEW
    var tracks = e.features[0].properties.Tracks; // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    var zoom = map.getZoom();

    const table = [
      `<tr><td>Location</td><td>${location}</td></tr>`,
      `<tr><td>Railroad</td><td>${railroad}</td></tr>`,
      `<tr><td>Access</td><td>${access}</td></tr>`,
      `<tr><td>Subdivision</td><td>${subdiv}</td></tr>`,
      `<tr><td>Milepost</td><td>${milepost}</td></tr>`,
      `<tr><td>Lanes</td><td>${lanes}</td></tr>`,
      `<tr><td>Road Authority</td><td>${authority}</td></tr>`,
      `<tr><td>Road Speed</td><td>${road_speed} kph</td></tr>`,
      `<tr><td>Trains per Day</td><td>${trains_daily}</td></tr>`,
      `<tr><td>Vehicles per Day</td><td>${vehicles_daily}</td></tr>`,
      `<tr><td>Train Speed</td><td>${train_speed} mph</td></tr>`,
      `<tr><td>Link</td><td><a href='https://www.therailmap.com?latlng=${coordinates[1]},${coordinates[0]}' target='_blank'>Click Me</a></td></tr>`
    ].join('');

    if (zoom > 11) {
      new mapboxgl.Popup({
        closeButton: false,
        offset: 10
      })
        .setLngLat(coordinates)
        .setHTML(`<div style='height:300px;overflow:auto;'><table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody>${table}</tbody></table></div>`)
        .addTo(map);
    }

    ;
    hoverpopup.remove();
  }); // On Hover

  map.on('mouseenter', 'CN-Railroad-Crossings', function (e) {
    var zoom = map.getZoom();

    if (zoom > 11) {
      map.getCanvas().style.cursor = 'pointer';

      function convertCase(str) {
        var lower = String(str).toLowerCase();
        return lower.replace(/(^| )(\w)/g, function (x) {
          return x.toUpperCase();
        });
      }

      var coordinates = e.features[0].geometry.coordinates.slice();
      var location = e.features[0].properties.Location; // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      hoverpopup.setLngLat(coordinates).setHTML("<b>" + location + "</b>").addTo(map);
    }

    ;
  }); // On Leave

  map.on('mouseleave', 'CN-Railroad-Crossings', function () {
    map.getCanvas().style.cursor = '';
    hoverpopup.remove();
  }); // Bridge //
  // On Click

  map.on('click', 'CN-Railroad-Bridges', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var name = e.features[0].properties.name;
    var operator = e.features[0].properties.operator // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    var zoom = map.getZoom();

    const table = [
      `<tr><td>Name</td><td>${name}</td></tr>`,
      `<tr><td>Operator</td><td>${operator}</td></tr>`,
      `<tr><td>Link</td><td><a href='https://www.therailmap.com?latlng=${coordinates[1]},${coordinates[0]}' target='_blank'>Click Me</a></td></tr>`
    ].join('');

    if (zoom > 11) {
      new mapboxgl.Popup({
        closeButton: false,
        offset: 10
      }).setLngLat(coordinates).setHTML(`<table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody>${table}</tbody></table>`).addTo(map);
    }

    ;
    hoverpopup.remove();
  }); // On Hover

  map.on('mouseenter', 'CN-Railroad-Bridges', function (e) {
    var zoom = map.getZoom();

    if (zoom > 11) {
      map.getCanvas().style.cursor = 'pointer';

      function convertCase(str) {
        var lower = String(str).toLowerCase();
        return lower.replace(/(^| )(\w)/g, function (x) {
          return x.toUpperCase();
        });
      }

      var coordinates = e.features[0].geometry.coordinates.slice();
      var name = e.features[0].properties.name; // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      hoverpopup.setLngLat(coordinates).setHTML("<b>" + name + "</b>").addTo(map);
    }

    ;
  }); // On Leave Bridge CN

  map.on('mouseleave', 'CN-Railroad-Bridges', function () {
    map.getCanvas().style.cursor = '';
    hoverpopup.remove();
  });

  // Amtrak //

  map.on('click', 'amtrak-stations', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var stncode = e.features[0].properties.stncode;
    var stnname = e.features[0].properties.stnname;
    var info = "https://asm.transitdocs.com/station/" + stncode;
    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    var zoom = map.getZoom();

    const table = [
      `<tr><td>Name</td><td>${stnname}</td></tr>`,
      `<tr><td>Code</td><td>${stncode}</td></tr>`
    ].join('');

    if (zoom > 4) {
      new mapboxgl.Popup({
        closeButton: false,
        offset: 10
      })
        .setLngLat(coordinates)
        .setHTML(`<table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody>${table}</tbody></table><br>Status and more is avalible <a href=" + info + " target='_blank'>here</a>`)
        .addTo(map);
    }

    hoverpopup.remove();
  }); // On Hover

  map.on('mouseenter', 'amtrak-stations', function (e) {
    var zoom = map.getZoom();

    if (zoom > 4) {
      map.getCanvas().style.cursor = 'pointer';

      function convertCase(str) {
        var lower = String(str).toLowerCase();
        return lower.replace(/(^| )(\w)/g, function (x) {
          return x.toUpperCase();
        });
      }

      var coordinates = e.features[0].geometry.coordinates.slice();
      var stncode = e.features[0].properties.stncode;
      var stnname = e.features[0].properties.stnname;
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      hoverpopup.setLngLat(coordinates).setHTML("<b>" + stnname + "</b>").addTo(map);
    }

    ;
  }); // On Leave

  map.on('mouseleave', 'amtrak-stations', function () {
    map.getCanvas().style.cursor = '';
    hoverpopup.remove();
  });  

  // Amtrak Trains //

  map.on('click', 'trains', function (e) {
    const coordinates = e.features[0].geometry.coordinates.slice();
    // create table with all properties
    const properties = e.features[0].properties;
    const routeName = e.features[0].properties.routeName;
    const trainNum = e.features[0].properties.trainNum;
    // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, the popup appears over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    };
    const table = [
      `<tr><td>Route</td><td>${properties['routeName']}</td></tr>`,
      `<tr><td>Heading</td><td>${properties['heading']}</td></tr>`,
      `<tr><td>Velocity</td><td>${properties['velocity'].toFixed(2)}</td></tr>`,
      `<tr><td>TZ</td><td>${properties['trainTimeZone']}</td></tr>`,
      `<tr><td>State</td><td>${properties['trainState']}</td></tr>`,
      `<tr><td>Next Station</td><td>${properties['eventName']}</td></tr>`,
      `<tr><td>Origin Station</td><td>${properties['origCode']}</td></tr>`,
      `<tr><td>Destination Station</td><td>${properties['destCode']}</td></tr>`,
      `<tr><td>Timely</td><td>${properties['trainTimely']}</td></tr>`,
      // use moment fromNow to get time since last update
      `<tr><td>Last Updated</td><td>${moment(properties['updatedAt']).fromNow()}</td></tr>`
    ].join('');
    new mapboxgl.Popup({
      closeButton: false,
      offset: 10
    })
      .setLngLat(coordinates)
      .setHTML(`<div style='height:300px;overflow:auto;'><table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody>${table}</tbody></table></div>`)
      .addTo(map);
  }); // On Hover

  map.on('mouseenter', 'trains', function () {
      map.getCanvas().style.cursor = 'pointer';
  }); // On Leave
});

map.on('idle',function(){
  loaderDiv.style.display = 'none';
  // write "loaded" item to local storage
  localStorage.setItem('previouslyLoaded', 'true');
});

map.on('styledata', (e) => {
  var styleName = e.style.stylesheet.name;
  if (!(styleName.includes('Europe') || styleName.includes('Data'))) {
    displayAmtrak();
  };
});

};

main();