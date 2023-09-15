import { fromLonLat } from 'ol/proj';
import { Point, LineString } from 'ol/geom';
import Feature from 'ol/Feature';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Style, Circle, Fill, Stroke } from 'ol/style';

export function createMapData(journeyStops) {
    const coordinates = extractCoordinates(journeyStops);
    const pointFeatures = createPointFeatures(journeyStops);

    const lineFeature = createLineFeature(coordinates);
    const vectorSource = createVectorSource([lineFeature, ...pointFeatures]);
    const vectorLayer = createVectorLayer(vectorSource);

    return {
        coordinates,
        vectorLayer,
    };
}

function extractCoordinates(stops) {
    const coordinates = [];
    for (const stopId in stops) {
        const stop = stops[stopId];
        const lonLat = fromLonLat([stop.Longitude, stop.Latitude]);
        coordinates.push(lonLat);
    }
    return coordinates;
}

function createPointFeatures(stops) {
    return Object.values(stops).map((stop) => {
        const lonLat = fromLonLat([stop.Longitude, stop.Latitude]);
        const point = new Point(lonLat);
        const pointFeature = new Feature({ geometry: point });

        const accessibleStyle = new Style({
            image: new Circle({
                radius: 5,
                fill: new Fill({
                    color: stop.TimingPointWheelChairAccessible === 'ACCESSIBLE' ? 'blue' : 'red',
                }),
                stroke: new Stroke({
                    color: stop.TimingPointWheelChairAccessible === 'ACCESSIBLE' ? 'blue' : 'red',
                    width: 2,
                }),
            }),
        });

        pointFeature.setProperties({
            'stop': stop,
            'selected': false,
        });

        pointFeature.setStyle(accessibleStyle);

        return pointFeature;
    });
}

function createLineFeature(coordinates) {
    const lineString = new LineString(coordinates);
    return new Feature({ geometry: lineString });
}

function createVectorSource(features) {
    return new VectorSource({ features });
}

function createVectorLayer(source) {
    return new VectorLayer({ source });
}