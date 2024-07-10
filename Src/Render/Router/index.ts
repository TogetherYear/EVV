import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Default',
        redirect: '/Application'
    },
    {
        path: '/:pathMatch(.*)',
        name: '404',
        redirect: '/Empty'
    },
    {
        path: '/Empty',
        name: 'Empty',
        component: () => import('@Render/Views/Empty/Empty.vue'),
    },
    {
        path: '/Application',
        name: 'Application',
        component: () => import('@Render/Views/Application/Application.vue'),
    },
    {
        path: '/Tray',
        name: 'Tray',
        component: () => import('@Render/Views/Tray/Tray.vue'),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
