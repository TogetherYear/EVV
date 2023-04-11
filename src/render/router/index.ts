import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import ApplicationVue from '@render/views/Application/Application.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/Application'
    },
    {
        path: '/Application',
        name: 'Application',
        component: ApplicationVue
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
