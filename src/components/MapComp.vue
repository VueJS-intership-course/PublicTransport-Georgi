<template>
  <div class="map" id="map"></div>
</template>

<script setup>
import { onMounted, defineEmits, reactive } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import 'ol/ol.css'

const emit = defineEmits(['map-ready']);
let map = reactive({}); 

onMounted(() => {
  InitializeMap();
});

function InitializeMap() {
  map = new Map({
    target: 'map',
    view: new View({
      center: [0, 0],
      zoom: 5
    }),
    layers: [new TileLayer({
      source: new OSM()
    })]
  });

  map.once('postrender', () => {
    emit('map-ready', map);
  });
}
</script>

<style scoped>
.map {
  width: 800px;
  height: 720px;
}
</style>
