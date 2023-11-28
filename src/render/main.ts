// 消除一些安全提示
//@ts-ignore
window['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

import { createApp } from 'vue'

import AppVue from './App.vue'

import router from './router'

import { naive } from "./naive"

import pinia from './pinia'

import { Debug } from './plugins/Debug'
Debug.Instance.Run()

import { AppRequest } from './plugins/AppRequest'
AppRequest.Instance.Run()

import { FieldObserver } from './plugins/FieldObserver'
FieldObserver.Instance.Run()

createApp(AppVue)
    .use(router)
    .use(naive)
    .use(pinia)
    .mount('#app')
