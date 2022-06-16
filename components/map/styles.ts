import { LayerProps } from 'react-map-gl'

export const amtrak: LayerProps = {
  id: 'amtrak',
  type: 'circle',
  source: 'amtrak',
  paint: {
    'circle-color': 'hsl(203, 68%, 29%)',
    'circle-radius': 11,
    'circle-opacity': 1,
  },
  layout: {
    // Make the layer visible by default.
    visibility: 'visible',
  },
}

export const amtrakNumbers: LayerProps = {
  id: 'amtrak-numbers',
  type: 'symbol',
  source: 'amtrak',
  layout: {
    'text-field': ['to-string', ['get', 'trainNum']],
    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
    'text-size': 12,
    visibility: 'visible',
  },
  paint: {
    'text-color': '#fff',
  },
}

export const amtrakStations: LayerProps = {
  id: 'amtrak-stations',
  type: 'circle',
  metadata: { 'mapbox:group': '5726cb71a192901f43972cccb7869274' },
  source: 'composite',
  'source-layer': 'Amtrak_Stations',
  paint: {
    'circle-color': 'hsl(0, 0%, 100%)',
    'circle-radius': 7,
    'circle-opacity': ['interpolate', ['exponential', 0.66], ['zoom'], 2, 0, 22, 1],
  },
  layout: {
    visibility: 'visible',
  },
}

export const amtrakRoutesZoomed: LayerProps = {
  id: 'amtrak-routes-zoomed',
  type: 'line',
  metadata: { 'mapbox:group': 'd2c7035a94a3a85767c4b9213362728a' },
  source: 'composite',
  'source-layer': 'amtrak',
  maxzoom: 6,
  filter: [
    'all',
    [
      'match',
      ['get', 'railway'],
      ['construction', 'proposed', 'disused', 'abandoned', 'razed'],
      false,
      true,
    ],
    ['!', ['has', 'service']],
  ],
  layout: {
    visibility: 'none',
  },
  paint: { 'line-color': 'hsl(0, 100%, 100%)', 'line-width': 0.8 },
}

export const amtrakRoutes: LayerProps = {
  id: 'amtrak-routes',
  type: 'line',
  metadata: { 'mapbox:group': 'd2c7035a94a3a85767c4b9213362728a' },
  source: 'composite',
  'source-layer': 'Amtrak_Routes-23k7km',
  filter: [
    'all',
    [
      'match',
      ['get', 'railway'],
      ['construction', 'proposed', 'disused', 'abandoned', 'razed'],
      false,
      true,
    ],
    ['!', ['has', 'service']],
  ],
  layout: {
    visibility: 'none',
  },
  paint: { 'line-color': 'hsl(0, 100%, 100%)', 'line-width': 0.8 },
}

export const caltrain: LayerProps = {
  id: 'caltrain',
  type: 'circle',
  source: 'caltrain',
  paint: {
    'circle-color': '#db3241',
    'circle-radius': 11,
    'circle-opacity': 1,
  },
  layout: {
    // Make the layer visible by default.
    visibility: 'visible',
  },
}

export const caltrainLabels: LayerProps = {
  id: 'caltrain-labels',
  type: 'symbol',
  source: 'amtrak',
  layout: {
    'text-field': ['to-string', ['get', 'name']],
    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
    'text-size': 12,
    visibility: 'visible',
  },
  paint: {
    'text-color': '#fff',
  },
}
