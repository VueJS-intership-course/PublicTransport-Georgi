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
            immediate: true,
        },
    },

    data() {
        return {
            mapInstance: null,
        }
    },

    props: ['specificJourney', 'layers', 'mapId', 'viewOptions'],

    methods: {
        clearMap() {
            if (this.mapInstance) {
                const layersToRemove = this.mapInstance.getLayers().getArray().filter(layer => {
                    return layer.get('name') === 'PointLayer';
                });

                layersToRemove.forEach(layer => {
                    this.mapInstance.removeLayer(layer);
                });
            }
        },

        createMap() {
            this.mapInstance =  map = new Map({
                target: this.mapId,
                layers: [
                    ...this.layers,
                ],
                view: new View(this.viewOptions),
            });


            map.once('rendercomplete', () => {
                this.$emit('map-ready', this.mapInstance);
            });
        },

    },

};
</script>
  
<style scoped></style>
