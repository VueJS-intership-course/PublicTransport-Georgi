<template>
    <!-- <div>
       <NavigationComp></NavigationComp>
    </div>  -->
        <router-view></router-view> 
</template>

<script>
import { computed } from 'vue';
import journeyServices from '@/services/journeyServices.js';
import NavigationComp from '@/components/navigation/NavigationComp.vue';

export default {
    components: {
        NavigationComp
    },
    data() {
        return {
            items: [],
        }
    },

    async created() {
       this.items = (await journeyServices.getAllJourneys()).data
    },

    provide() {
        return {
            journeyList: computed(() => this.items)
        }
    }
}
</script>