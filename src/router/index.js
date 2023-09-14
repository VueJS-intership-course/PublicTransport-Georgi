import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import notFound from "./routes/notFound";

const router = createRouter({
    history:createWebHistory(),
    routes:[
        ...routes,
        ...notFound
    ],
    linkActiveClass:'active'
})


export default router;