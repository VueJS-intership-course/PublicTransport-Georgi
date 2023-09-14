<template>
    <nav>
        <ul>
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li>
                <router-link to="/about">About</router-link>
            </li>
        </ul>
    </nav>
</template>


<style scoped lang="scss">
nav {
    margin: 0;
    padding: 0;
    position: relative;
    top: 0;
    left: 0;
    background-color: rgb(103, 93, 112);

    ul {
        list-style: none;
        margin: 0;
        padding: 1rem 2rem;
        display: flex;
        gap: 2rem;
        justify-content: center;


        a {
            text-decoration: none;
            color: white;
        }
    }
}
</style>