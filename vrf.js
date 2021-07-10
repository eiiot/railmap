var _mapboxGlControls = require("mapbox-gl-controls");

var version = "v1.3";

// URL Stuff //

var url_string = window.location.href;
var url = new URL(url_string);
var location = url.searchParams.get("latlng");
var redirect = url.searchParams.get("redirect")

// ####### //
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

mapboxgl.accessToken = 'pk.eyJ1IjoiZG90bHkiLCJhIjoiY2tpbnA0YjljMTVhcTM0cGVzYjZibzEyMSJ9.fmuvKLVnmue6RxfqZjeLPQ';
var map = new mapboxgl.Map({
  container: 'map',
  // container id
  style: 'mapbox://styles/dotly/ckqo4p5i80jyj19oie9icbu52',
  center: [-96, 37.8],
  // starting position
  zoom: 3.5 // starting zoom

});

var mapStyle = 'usa';

if(redirect == 'europe'){
  switchLocation()
};

class AboutControl { // HERE
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
}

const aboutControl = new AboutControl(); // HERE

map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
})); // Add Search

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());

map.addControl(aboutControl); // HERE

var modal = document.getElementById("aboutPopup");

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function aboutMap() {
  if(modal.style.display == "block"){
    modal.style.display = "none";
  }
  else {
    modal.style.display = "block";
  };
}

window.onload = function() {
  if(location != null){
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

map.on('load', function () {
  console.log('map loaded');

  var hoverpopup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false,
    className: "hover",
    offset: 10
  }); 

  map.on('click', 'vrf-cameras', function (e) {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var name = e.features[0].properties.name;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    var zoom = map.getZoom();

    if (zoom > 4) {
      new mapboxgl.Popup({
        closeButton: false,
        offset: 10
      }).setLngLat(coordinates).setHTML("<table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody><tr><td>Name</td><td>" + name + "</td></tr></tbody></table>").addTo(map);
    }

    hoverpopup.remove();
  }); // On Hover

  map.on('mouseenter', 'vrf-cameras', function (e) {
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
      var name = e.features[0].properties.name;
      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      hoverpopup.setLngLat(coordinates).setHTML("<b>" + name + "</b>").addTo(map);
    }

    ;
  }); // On Leave

  map.on('mouseleave', 'vrf-cameras', function () {
    map.getCanvas().style.cursor = '';
    hoverpopup.remove();
  });
}); // On Load