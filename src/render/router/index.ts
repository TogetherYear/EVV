import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import EmptyVue from '@render/views/Empty/Empty.vue'
import ApplicationVue from '@render/views/Application/Application.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Default',
        redirect: '/Application'
    },
    {
        path: '/:pathMatch(.*)',
        name: 'Empty',
        redirect: '/404'
    },
    {
        path: '/404',
        name: '404',
        component: EmptyVue,
    },
    {
        path: '/Application',
        name: 'Application',
        component: ApplicationVue,
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
