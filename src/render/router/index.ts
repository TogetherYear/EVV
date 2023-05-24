import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
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
        component: () => import('@render/views/Empty/Empty.vue')
    },
    {
        path: '/Application',
        name: 'Application',
        component: () => import('@render/views/Application/Application.vue'),
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
