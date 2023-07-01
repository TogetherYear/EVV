// 消除一些安全提示
//@ts-ignore
window['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

import { createApp } from 'vue'

import AppVue from './App.vue'

import router from './router'

import { naive } from "./naive"

import pinia from './pinia'

import { AppRequest } from './libs/AppRequest'
AppRequest.Instance.Run()

createApp(AppVue)
    .use(router)
    .use(naive)
    .use(pinia)
    .mount('#app')
