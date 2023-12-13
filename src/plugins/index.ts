/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import router from '../router'

// Types
import type { App } from 'vue'

import { createPinia } from 'pinia'

//import VueDatePicker from '@vuepic/vue-datepicker';
//import '@vuepic/vue-datepicker/dist/main.css'


export function registerPlugins (app: App) {
  const pinia = createPinia()
  //app.component('VueDatePicker', VueDatePicker)
  app    
    .use(pinia)  
    .use(vuetify)
    .use(router)
}
