<template>
    <div class="journey-list">
        <span @click="$router.push({ query: { journey_id: stop.id }, append: true })" class="journey-item"
            :class="{ selected: $route.query.journey_id === stop.id }" v-for="(stop, key) in journeys.values"
            :key="key"><b>{{ stop.stops_count }}</b> - {{ stop.id }}</span>
    </div>
</template>

<script setup>
import JourneyServices from '@/services/transport/journey.js';
import { reactive } from 'vue'

const journeys = reactive([]);


const handleData = () => {
    JourneyServices.getAll().then((result) => {
        journeys.values = result;
    });
}


handleData();



</script>


<style scoped lang="scss">
.journey-list {
  display: flex;
  flex-direction: column;

  .journey-item {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    &.selected {
      font-weight: 600;
    }
  }
}
</style>