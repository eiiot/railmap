var version = "v1.3";

// URL Stuff //

var url_string = window.location.href;
var url = new URL(url_string);
var location = url.searchParams.get("latlng");
var redirect = url.searchParams.get("redirect")

mapboxgl.accessToken = 'pk.eyJ1IjoiZG90bHkiLCJhIjoiY2tpbnA0YjljMTVhcTM0cGVzYjZibzEyMSJ9.fmuvKLVnmue6RxfqZjeLPQ';
var map = new mapboxgl.Map({
  container: 'map',
  // container id
  style: 'mapbox://styles/dotly/ckoz5zgci1o3617nb0fiz48ig',
  center: [-96, 37.8],
  // starting position
  zoom: 3.5 // starting zoom

});

var mapStyle = 'usa';

if(redirect == 'europe'){
  switchLocation()
};

// On-Map Controls //

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
}

class LocationControl { 
  onAdd(map) {
  this._map = map;
  this._container = document.createElement('div');
  this._container.className = 'mapboxgl-ctrl';
  this._container.innerHTML = '<div class="mapboxgl-ctrl-group"> <button class="custom-icon" type="button" title="United States" aria-label="United States" aria-pressed="false"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="-40 -40 600 600"><path d="M336.5 160C322 70.7 287.8 8 248 8s-74 62.7-88.5 152h177zM152 256c0 22.2 1.2 43.5 3.3 64h185.3c2.1-20.5 3.3-41.8 3.3-64s-1.2-43.5-3.3-64H155.3c-2.1 20.5-3.3 41.8-3.3 64zm324.7-96c-28.6-67.9-86.5-120.4-158-141.6 24.4 33.8 41.2 84.7 50 141.6h108zM177.2 18.4C105.8 39.6 47.8 92.1 19.3 160h108c8.7-56.9 25.5-107.8 49.9-141.6zM487.4 192H372.7c2.1 21 3.3 42.5 3.3 64s-1.2 43-3.3 64h114.6c5.5-20.5 8.6-41.8 8.6-64s-3.1-43.5-8.5-64zM120 256c0-21.5 1.2-43 3.3-64H8.6C3.2 212.5 0 233.8 0 256s3.2 43.5 8.6 64h114.6c-2-21-3.2-42.5-3.2-64zm39.5 96c14.5 89.3 48.7 152 88.5 152s74-62.7 88.5-152h-177zm159.3 141.6c71.4-21.2 129.4-73.7 158-141.6h-108c-8.8 56.9-25.6 107.8-50 141.6zM19.3 352c28.6 67.9 86.5 120.4 158 141.6-24.4-33.8-41.2-84.7-50-141.6h-108z"/></svg> </button> </div>';
  this._container.addEventListener('click', function(e) {
    switchLocation();
  }, false)

  return this._container;
  }
   
  onRemove() {
  this._container.parentNode.removeChild(this._container);
  this._map = undefined;
  }
}

const aboutControl = new AboutControl(); 
const locationControl = new LocationControl(); 

map.addControl(new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true
  },
  trackUserLocation: true
}));

map.addControl(new mapboxgl.NavigationControl());
map.addControl(new mapboxgl.FullscreenControl());

map.addControl(locationControl); 
map.addControl(aboutControl); 

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

function switchLocation() {
  if(mapStyle == 'usa'){
    map.setStyle('mapbox://styles/dotly/ckpxomzkq08gp19o8o99y0yut');
    mapStyle = 'europe';
    map.flyTo({
      center: [14,50.3],
      zoom: 3.5,
      essential: true
    })
  }
  else{
    map.setStyle('mapbox://styles/dotly/ckoz5zgci1o3617nb0fiz48ig');
    mapStyle = 'usa';
    map.flyTo({
      center: [-96, 37.8],
      zoom: 3,
      essential: true
   })
  } 
};

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