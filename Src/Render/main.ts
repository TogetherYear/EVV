import { createApp } from 'vue';

import RootVue from './Root.vue';

import { router } from './Router';

createApp(RootVue).use(router).mount('#App');
