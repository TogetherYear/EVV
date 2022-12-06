import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import VesselVue from '@render/views/Vessel/Vessel.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/Vessel'
    },
    {
        path: '/Vessel',
        name: 'Vessel',
        component: VesselVue
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
