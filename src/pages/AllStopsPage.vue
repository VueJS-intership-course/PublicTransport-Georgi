<template>
    <div>
        <OpenMap :layers="layers" :mapId="mapId" :viewOptions="viewOptions" :specificJourney="journeysData"
            @map-ready="mapLoaded" ></OpenMap>
        <stopInformation v-if="stopInformation" :selectedStop="stopInformation"></stopInformation>
    </div>
</template>

<script>
import OpenMap from '../components/Map/OpenMap.vue';
import journeyServices from '@/services/journeyServices.js';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { createMapData } from '../utils/allStopsUtils.js';
import { Style, Fill, Circle, Stroke } from 'ol/style';
import StopInformation from '../components/Map/StopInformation.vue';

export default {
    components: {
        OpenMap,
        StopInformation
    },

    data() {
        return {
            pointStyles: {
                ACCESSIBLE: {
                    fill: 'blue',
                    stroke: 'blue',
                },
                NON_ACCESSIBLE: {
                    fill: 'red',
                    stroke: 'red',
                },
            },
            map: null,
            layers: [
                new TileLayer({
                    source: new OSM(),
                }),
            ],
            mapId: 'map',
            viewOptions: {
                center: [0, 0],
                zoom: 20,
            },

            journeysData: [],
            mapIsLoaded:false,
            stopInformation:null

        }
    },

    async mounted() {
        await this.fetchStopsData();
    },

    methods: {
        async fetchStopsData() {
            try {
                this.journeysData = await journeyServices.getTenStops();
                const { coordinates, vectorLayers } = createMapData(this.journeysData);
                this.viewOptions.center = coordinates[0];
                this.layers.push(vectorLayers);
            } catch (error) {
                console.error(error);
            }


        },
        mapLoaded(map) {
            this.map = map;
            this.map.on('click', (event) => {
                this.handleMapClick(event.coordinate)
            })
        },

        clearMap() {
            if (!this.map) {
                return
            }

            if (this.layers.length > 1) {
                this.layers.splice(1)
            }
            this.map.dispose();
            this.map = null;
        },

        handlePointClick(stop) {
            this.stopInformation = {
                id: stop.JourneyPatternCode,
                name: stop.TimingPointName,
                status: stop.TripStopStatus,
                wheelchairAccessible: stop.TimingPointWheelChairAccessible || stop.WheelChairAccessible,
            }
            console.log(this.stopInformation);
        },

        
        handleMapClick(coordinate) {
            const clickedFeature = this.map.forEachFeatureAtPixel(
                this.map.getPixelFromCoordinate(coordinate),
                (feature) => feature
            );

            if (clickedFeature) {
                const stop = clickedFeature.get('stop');
                const selected = clickedFeature.get('selected');

                clickedFeature.set('selected', !selected);

                const style = new Style({
                    image: new Circle({
                        radius: 5,
                        fill: new Fill({
                            color: !selected ? 'yellow' :
                                stop.TimingPointWheelChairAccessible === 'ACCESSIBLE' ? this.pointStyles.ACCESSIBLE.fill : this.pointStyles.NON_ACCESSIBLE.fill,
                        }),
                        stroke: new Stroke({
                            color: !selected ? 'yellow' :
                                stop.TimingPointWheelChairAccessible === 'ACCESSIBLE' ? this.pointStyles.ACCESSIBLE.stroke : this.pointStyles.NON_ACCESSIBLE.stroke,
                            width: 2,
                        }),
                    }),
                });

                clickedFeature.setStyle(style);

                if (selected) {
                    this.stopInformation = null; 
                } else {
                    this.handlePointClick(stop); 
                }
            }
        },
    },

    beforeDestroy() {
        this.clearMap()
    }
}
</script>