<template>
    <div class="pagin">
        <div class="controls">
            <button @click="changePage(-1)" :disabled="prevButtonDisabled">Previous</button>
            <button @click="changePage(1)" :disabled="nextButtonDisabled">Next</button>
        </div>
        <!-- <div>
            <ul>
                <li v-for="page in totalPages" :key="page">
                    <button @click="goToPage(page)" :class="{ active: currentPage === page }">{{ page }}</button>
                </li>
            </ul>
        </div> -->
    </div>
</template>
  
<script>
export default {
    name:'Paginator',
    emits: ['update:currentPage'],
    props: {
        totalItems: {
            type: Array,
            required: true,
        },
        itemsPerPage: {
            type: Number,
            required: true,
        },
        currentPage: {
            type: Number,
            required: true,
        },
    },
    computed: {
        totalPages() {
            return Math.ceil(this.totalItems.length / this.itemsPerPage);
        },

        prevButtonDisabled() {
            return this.currentPage === 1;
        },

        nextButtonDisabled() {
            return this.currentPage === this.totalPages
        }
    },
    methods: {
        changePage(direction) {
            this.$emit('update:currentPage', this.currentPage + direction);
        },
        goToPage(page) {
            this.$emit('update:currentPage', page);
        },
    },
};
</script>
  
<style scoped lang="scss">
.pagin {
    margin-top: 0.5rem;
}

.active {
    font-weight: bold;
    background-color: red;
}

ul {
    list-style: none;
    display: flex;
    gap: 0.2rem;
    justify-content: center;
}

.controls {
    display: flex;
    gap: 0.2rem;
    justify-content: center;
}

button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.4rem;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #9871b8;
    cursor: pointer;
    transition: border-color 0.25s;
}

button:hover {
    border-color: #646cff;
}

button:focus,
button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
}
</style>
  