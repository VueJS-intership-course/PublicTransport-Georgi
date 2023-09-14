<template>
    <base-card>
        <h3>{{ selectedStop.name }}</h3>
        <p>Status: {{ selectedStop.status }}</p>
        <p>Wheelchair Accessible: {{ selectedStop.wheelchairAccessible }}</p>
    </base-card>
</template>


<script>
export default {
    props: {
        selectedStop: {
            type: Object,
            required: true
        }
    }
}
</script>


<style scoped></style>