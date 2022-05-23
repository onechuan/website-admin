import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

import Home from "@/pages/home/index.vue";


const routes: Array<RouteRecordRaw> = [
    {
        path:"/",
        name:"Home",
        component:Home
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router;