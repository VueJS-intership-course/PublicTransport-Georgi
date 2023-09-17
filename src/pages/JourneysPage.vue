<template>
    <div class="items">
        <div v-if="$route.params.journeyId">
            <OpenMap :specificJourney="specificJourneyData" @load-data="fetchJourneyData" @map-ready="mapLoaded"
                :layers="layers" :mapId="mapId" :viewOptions="viewOptions"></OpenMap>
            <stop-information v-if="stopInformation" :selectedStop="stopInformation"
                :key="stopInformation.id"></stop-information>
        </div>
        <div v-else class="select-journey">
            <h1>Please, select a journey!</h1>
        </div>
        <div>
            <JourneyList :current-page="currentPage" :itemsPerPage="itemsPerPage"></JourneyList>
            <PaginatorComp :itemsPerPage="itemsPerPage" v-model:currentPage="currentPage" :total-items="journeysArray">
            </PaginatorComp>
        </div>
    </div>
</template>

<script>
import JourneyList from '../components/Journey/JourneyList.vue';
import PaginatorComp from '@/components/paginator/PaginatorComp.vue';
import OpenMap from '../components/Map/OpenMap.vue';
import journeyServices from '@/services/journeyServices.js';
import StopInformation from '../components/Map/StopInformation.vue';
import { Style, Circle, Fill, Stroke } from 'ol/style';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { createMapData } from '../utils/mapUtils';

export default {
    inject: ['journeyList'],

    components: {
        JourneyList,
        PaginatorComp,
        OpenMap,
        StopInformation
    },


    data() {
        return {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: this.journeyList,
            specificJourney: [],
            stopInformation: null,
            map: null,
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

        }
    },

    computed: {
        journeysArray() {
            return this.journeyList ? Object.keys(this.journeyList) : []
        },

        specificJourneyData() {
            return this.specificJourney
        }

    },

    async mounted() {
        if (this.$route.params.journeyId) {
            await this.fetchJourneyData()
        } else {
            this.specificJourney = null;
        }

        this.scrollToTop();
    },

    watch: {
        '$route.params': {
            handler: 'fetchJourneyData',
            // immediate:true
        }
    },

    methods: {
        async fetchJourneyData() {
            try {
                this.scrollToTop();
                this.clearMap();

                this.stopInformation = null;

                const journeyData = await journeyServices.getSingleJourney(this.$route.params.journeyId);
                const { coordinates, vectorLayer } = createMapData(journeyData);
                this.layers.push(vectorLayer)
                console.log("VectorLayers", vectorLayer);
                this.specificJourney = journeyData;
                this.viewOptions.center = coordinates[0]

            } catch (error) {
                console.error('Failed to fetch journey data:', error);
            }
        },

        handlePointClick(stop) {
            this.stopInformation = {
                id: stop.JourneyPatternCode,
                name: stop.TimingPointName,
                status: stop.TripStopStatus,
                wheelchairAccessible: stop.TimingPointWheelChairAccessible || stop.WheelChairAccessible,
            }
        },


        mapLoaded(map) {
            this.map = map;
            map.on('click', (event) => {
                this.handleMapClick(event.coordinate);
            });
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

        scrollToTop() {
            scroll({
                top: 0,
                left: 0,
                behavior: 'smooth'
            })
        },

        clearMap() {
            if (!this.map) {
                return
            }

            if (this.layers.length > 1) {
                this.layers.pop()
            }
            this.map.dispose();
            this.map = null;
        },
    },

    beforeDestroy() {
        this.clearMap()
    }
}
</script>



<style scoped>
.select-journey {
    border: 2px solid rgb(14, 13, 13);
    text-align: center;
    background-color: rgb(174, 174, 228);
}
</style>