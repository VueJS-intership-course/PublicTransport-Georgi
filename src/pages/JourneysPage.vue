<template>
    <div class="wrapper">
        <JourneyList></JourneyList>
        <MapComp @map-ready="mapLoaded"></MapComp>
        <div v-if="stopInformation">
            <h3>Name: {{ stopInformation.name }}</h3>
            <p>Status: {{ stopInformation.status }}</p>
            <p>wheelchair Accessible: {{ stopInformation.wheelchair }}</p>
        </div>
    </div>
</template>
  
<script setup>
import { defineAsyncComponent, ref, reactive, watch } from 'vue';
import JourneyService from '@/services/transport/journey.js';
import { useRoute } from 'vue-router';

import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import Feature from 'ol/Feature';
import VectorSource from "ol/source/Vector";
import Point from "ol/geom/Point.js";

let map;
let layers = ref(null);
const stopInformation = ref(null);
const MapComp = defineAsyncComponent(() => import('@/components/MapComp.vue'));
const JourneyList = defineAsyncComponent(() => import('@/components/JourneyList.vue'));
const route = useRoute();

const mapLoaded = (loadedMap) => {
    map = loadedMap;
    map.on('click', (event) => {
        handleMapClick(event.coordinate)
    })
}

const loadJourney = (id) => {
    JourneyService.getJourney(id).then((result) => {
        const stops = result;
        map.removeLayer(layers);
        layers = createLayer(stops);
        map.addLayer(layers);
        const extent = layers.getSource().getExtent();
        map.getView().fit(extent, { duration: 2500, zoom: 15 })
    }).catch(err => console.log('Error is going on', err.message))
};

const createLayer = (stops) => {
    const features = stops.map(item => new Feature({
        geometry: new Point(fromLonLat([item.lon, item.lat])),
        properties: item
    }))


    const source = new VectorSource({
        features: features
    });

    return new VectorLayer({ source });
}

const handleMapClick = (coordinate) => {
    const clickedFeature = map.forEachFeatureAtPixel(
        map.getPixelFromCoordinate(coordinate),
        (feature) => feature
    );


    if (clickedFeature) {
        handlePointClick(clickedFeature.getProperties().properties)
    }

}

const handlePointClick = (stop) => {
    stopInformation.value = {
        name: stop.name,
        status: stop.status,
        wheelchair: stop.wheelchair,
    }
}

watch(() => route.query.journey_id, (newQuery) => {
    if (newQuery) {
        loadJourney(newQuery)
    }
}, { immediate: true });

</script>
  
<style scoped>
.wrapper {
    display: flex;
}
</style>
  