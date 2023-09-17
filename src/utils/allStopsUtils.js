import { fromLonLat } from 'ol/proj';
import { Point } from 'ol/geom';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Circle, Fill, Stroke } from 'ol/style';

export function createMapData(journeyStops) {
    const coordinates = extractCoordinates(journeyStops);
    const pointFeatures = createPointStops(journeyStops);

    const vectorSource = createVectorSource(pointFeatures);
    const vectorLayer = createVectorLayer(vectorSource);

    return {
        coordinates,
        vectorLayers: vectorLayer,
    };
}

function extractCoordinates(stopsArray) {
    const coordinates = [];
    console.log('Stops array:', stopsArray);

    for (const stop of stopsArray) {
        Object.values(stop).map(stop => {
            const lonLat = fromLonLat([stop.Longitude, stop.Latitude]);
            coordinates.push(lonLat);
        })
    }

    return coordinates;
}

function createPointStops(stopsArray) {
    const pointFeatures = [];

    for (const nestedStopsObject of Object.values(stopsArray[0])) {
        const nestedStop = nestedStopsObject;

        const lonLat = fromLonLat([nestedStop.Longitude, nestedStop.Latitude]);
        const point = new Point(lonLat);
        const pointFeature = new Feature({ geometry: point });

        const accessibleStyle = new Style({
            image: new Circle({
                radius: 5,
                fill: new Fill({
                    color: 'red',
                }),
                stroke: new Stroke({
                    color: 'red',
                    width: 2,
                }),
            }),
        });

        pointFeature.setProperties({
            'stop': nestedStop,
            'selected': false,
        });

        pointFeature.setStyle(accessibleStyle);

        pointFeatures.push(pointFeature);
    }

    return pointFeatures;
}


function createVectorSource(features) {
    return new VectorSource({ features });
}

function createVectorLayer(source) {
    return new VectorLayer({ source });
}
