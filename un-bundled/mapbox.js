mapboxgl.accessToken = 'pk.eyJ1IjoiZG90bHkiLCJhIjoiY2tpbnA0YjljMTVhcTM0cGVzYjZibzEyMSJ9.fmuvKLVnmue6RxfqZjeLPQ';

import { StylesControl } from 'mapbox-gl-controls';

var map = new mapboxgl.Map({
container: 'map', // container id
style: 'mapbox://styles/dotly/ckoxhacbh01n417tdqjw1evgy',
center: [-96, 37.8], // starting position
zoom: 3 // starting zoom
});

map.addControl(new StylesControl({
    styles: [
      {
        label: 'Satellite',
        styleName: 'Satellite',
        styleUrl: 'mapbox://styles/dotly/ckoxhacbh01n417tdqjw1evgy',
      }, {
        label: 'Light',
        styleName: 'Light',
        styleUrl: 'mapbox://styles/dotly/ckoz6vsl50kv117pg6tbt6icm',
      }, {
        label: 'Data',
        styleName: 'Data',
        styleUrl: 'mapbox://styles/dotly/ckoz5zgci1o3617nb0fiz48ig',
      },
    ],
    onChange: (style) => console.log(style),
  }), 'top-left');

// Add geolocate control to the map.
map.addControl(
	new mapboxgl.GeolocateControl({
		positionOptions: {
		enableHighAccuracy: true
},
		trackUserLocation: true
})
);

// Add Search

map.addControl(
	new MapboxGeocoder({
		accessToken: mapboxgl.accessToken,
		mapboxgl: mapboxgl,
		collapsed: true,
        marker: false
}),
'top-left'
);

// Add Map Controls
map.addControl(
	new mapboxgl.NavigationControl()
);

map.addControl(new mapboxgl.FullscreenControl());

map.on('load', function () {   

    var hoverpopup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        className: "hover",
        offset: 10
    });

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
        var street = e.features[0].properties.STREET;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        var zoom = map.getZoom();
        if (zoom > 11) {
            new mapboxgl.Popup({
                closeButton: false, 
                closeOnMove: true,
                offset: 10
            })
            .setLngLat(coordinates)
            .setHTML(
                "<table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody><tr><td>Railroad</td><td>" + railroad + "</td></tr><tr><td>Division</td><td>" + div + "</td></tr><tr><td>Subdivision</td><td>" + subdiv + "</td></tr><tr><td>Street</td><td>" + street + "</td></tr><tr><td>Crossing ID</td><td>" + crossingid + "</td></tr><tr><td>Milepost</td><td>" + milepost + "</td></tr></tbody></table>"
            )
            .addTo(map);
        }
        
        hoverpopup.remove();
    });

    // On Hover
    map.on('mouseenter', 'Railroad-Crossings', function (e) {
        var zoom = map.getZoom();
        if (zoom > 11) {
            map.getCanvas().style.cursor = 'pointer';

            function convertCase(str) {
            var lower = String(str).toLowerCase();
            return lower.replace(/(^| )(\w)/g, function(x) {
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
            var street = convertCase(streetraw);

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            hoverpopup.setLngLat(coordinates).setHTML("<b>" + street + "</b>").addTo(map);
        };
    });
    
    // On Leave
    map.on('mouseleave', 'Railroad-Crossings', function () {
        map.getCanvas().style.cursor = '';
        hoverpopup.remove();
    });

    // Bridge //

    // On Click
    map.on('click', 'Railroad-Bridges', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var id = e.features[0].properties.ID;
        var railroad = e.features[0].properties.RAILWAY_NM;
        var brname = e.features[0].properties.NAME;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        var zoom = map.getZoom();
        if (zoom > 11) {
            new mapboxgl.Popup({
                closeButton: false, 
                closeOnMove: true,
                offset: 10
            })
            .setLngLat(coordinates)
            .setHTML(
                "<table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody><tr><td>Name</td><td>" + brname + "</td></tr><tr><td>Railroad</td><td>" + railroad + "</td></tr><tr><td>Id</td><td>" + id + "</td></tr></tbody></table>"
            )
            .addTo(map);
        };

        hoverpopup.remove();
    });


    // On Hover
    map.on('mouseenter', 'Railroad-Bridges', function (e) {
        var zoom = map.getZoom();
        if (zoom > 11) {
            map.getCanvas().style.cursor = 'pointer';

            function convertCase(str) {
            var lower = String(str).toLowerCase();
            return lower.replace(/(^| )(\w)/g, function(x) {
                return x.toUpperCase();
            });
            }

            var coordinates = e.features[0].geometry.coordinates.slice();
            var nameraw = e.features[0].properties.NAME;
            var name = convertCase(nameraw);

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            hoverpopup.setLngLat(coordinates).setHTML("<b>" + name + "</b>").addTo(map);
        };
    });
    
    // On Leave
    map.on('mouseleave', 'Railroad-Bridges', function () {
        map.getCanvas().style.cursor = '';
        hoverpopup.remove();
    });

    ////////////
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
        var tracks = e.features[0].properties.Tracks;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        var zoom = map.getZoom();
        if (zoom > 11) {
            new mapboxgl.Popup({
                closeButton: false, 
                closeOnMove: true,
                offset: 10
            })
            .setLngLat(coordinates)
            .setHTML(
                "<table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody><tr><td>Location</td><td>" + location + "</td></tr><tr><td>Railroad</td><td>" + railroad + "</td></tr><tr><td>Access</td><td>" + access + "</td></tr><tr><td>Subdivision</td><td>" + subdiv + "</td></tr></tbody><tr><td>Tracks</td><td>" + tracks + "</td></tr></table>"
            )
            .addTo(map);
        };
        hoverpopup.remove();
    });

    // On Hover
    map.on('mouseenter', 'CN-Railroad-Crossings', function (e) {
        var zoom = map.getZoom();
        if (zoom > 11) {
            map.getCanvas().style.cursor = 'pointer';

            function convertCase(str) {
            var lower = String(str).toLowerCase();
            return lower.replace(/(^| )(\w)/g, function(x) {
                return x.toUpperCase();
            });
            }

            var coordinates = e.features[0].geometry.coordinates.slice();
            var location = e.features[0].properties.Location;

            // Ensure that if the map is zoomed out such that multiple
            // copies of the feature are visible, the popup appears
            // over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            hoverpopup.setLngLat(coordinates).setHTML("<b>" + location + "</b>").addTo(map);
        };

    });
    
    // On Leave
    map.on('mouseleave', 'CN-Railroad-Crossings', function () {
        map.getCanvas().style.cursor = '';
        hoverpopup.remove();
    });

    // Bridge //

    // On Click
    map.on('click', 'CN-Railroad-Bridges', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var name = e.features[0].properties.name;

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        var zoom = map.getZoom();
        if (zoom > 11) {
            new mapboxgl.Popup({
                closeButton: false, 
                closeOnMove: true,
                offset: 10
            })
            .setLngLat(coordinates)
            .setHTML(
                "<table><thead><tr><th>Name</th><th>Value</th></tr></thead><tbody><tr><td>Name</td><td>" + name + "</td></tr><tr></tbody></table>"
            )
            .addTo(map);
        };

        hoverpopup.remove();
    });


    // On Hover
    map.on('mouseenter', 'CN-Railroad-Bridges', function (e) {    
        var zoom = map.getZoom();
        if (zoom > 11) {
            map.getCanvas().style.cursor = 'pointer';

            function convertCase(str) {
            var lower = String(str).toLowerCase();
            return lower.replace(/(^| )(\w)/g, function(x) {
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
        };
    });
    
    // On Leave Bridge US
    map.on('mouseleave', 'CN-Railroad-Bridges', function () {
        map.getCanvas().style.cursor = '';
        hoverpopup.remove();
    });    
});
