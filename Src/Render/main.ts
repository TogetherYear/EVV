import { createApp } from 'vue'

import AppVue from './App.vue'

import router from './Router'

import { naive } from "./Naive"

import './Plugins/Debug'

import './Plugins/FieldObserver'

createApp(AppVue)
    .use(router)
    .use(naive)
    .mount('#App')
