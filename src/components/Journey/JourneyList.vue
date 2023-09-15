<template>
    <div>
        <h3>Page {{ currentPage }}</h3>
        <ul>
            <li v-for="(item, key) in itemsOnCurrentPage" :key="key">
                <h2>{{ item.journey }}</h2>

                <router-link :to="{name:'Journey-Page', params:{journeyId:item.journey}}">
                    <button>Choose Journey</button>
                </router-link>
            </li>
        </ul>
    </div>
</template>
  

<script>
export default {
    inject: ['journeyList'],
    props: {
        itemsPerPage: {
            type: Number,
            required: true
        },

        currentPage: {
            type: Number,
            required: false,
            default: 1
        }
    },

    computed: {
        itemsOnCurrentPage() {
            const objectKeys = Object.keys(this.journeyList);

            const arrayOfObjects = objectKeys.map(key => ({ journey: key, value: this.journeyList[key] }));

            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;

            return arrayOfObjects.slice(startIndex, endIndex);
        },
    },
}
</script>


<style scoped lang="scss">
h3 {
    text-align: center;
    font-weight: 900;
    color: blue;
    font-size: x-large;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
        border: 1px solid black;
        padding: 1rem;
        text-align: center;

        button {
            border-radius: 8px;
            border: 1px solid transparent;
            padding: 0.6em 1.2em;
            font-size: 1em;
            font-weight: 500;
            font-family: inherit;
            background-color: #bdbdbd;
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
    }
}

.active {
   button { 
    background-color: red;
    opacity: 0.7;
   }
}</style>