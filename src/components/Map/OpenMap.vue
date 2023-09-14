<template>
    <div>
        <div id="map" style="width: 100%; height: 400px;"></div>
    </div>
</template>
  
<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';

export default {
    name: 'Open Map',

    watch: {
        'specificJourney': {
            handler: 'createMap',
            immediate: true
        }
    },

    props: ['specificJourney', 'layers', 'mapId', 'viewOptions'],

    methods: {

        createMap() {
            const map = new Map({
                target: this.mapId,
                layers: [
                    ...this.layers,
                ],
                view: new View(this.viewOptions),
            });


            map.once('rendercomplete', () => {
                this.$emit('map-ready', map)
            });

        },

    },

};
</script>
  
<style scoped></style>
