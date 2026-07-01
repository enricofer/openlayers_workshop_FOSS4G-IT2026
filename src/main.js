import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import GeoJSON from 'ol/format/GeoJSON';
import Map from 'ol/Map';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';

import {fromLonLat} from 'ol/proj';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';

import Text from 'ol/style/Text';

const stati = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: './data/countries.json',
  }),
});

function labelStyle(feature, resolution) {
    return new Style({
        stroke: new Stroke({
            color: 'orange',
            width: 4,
        }),
        fill: new Fill({
            color: 'rgba(120, 0, 255, 0.25)',
        }),
        text: new Text({
            text: feature.get("reg_name"),
        })
    })
}

const regioni = new VectorLayer({
  source: new VectorSource({
    format: new GeoJSON(),
    url: 'https://raw.githubusercontent.com/openpolis/geojson-italy/refs/heads/master/geojson/limits_IT_regions.geojson',
  }),
  style: labelStyle
});

const osm = new TileLayer({
  source: new OSM(),
});

const map = new Map({
  target: 'map-container',
  layers: [osm,stati,regioni],
  view: new View({
    center: fromLonLat([12.6, 42.3]),
    zoom: 6,
  }),
});