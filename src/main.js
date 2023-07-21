import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core'; /* import the fontawesome core */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'; /* import font awesome icon component */
/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

library.add(fas, fab, far); // /* add icons to the library */
Vue.component('font-awesome-icon', FontAwesomeIcon); /* register font awesome icon component */

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');



import * as VueGoogleMaps from 'vue2-google-maps'
import GmapMarker from 'vue2-google-maps/src/components/marker';
import GmapMap from 'vue2-google-maps/src/components/map';
import GmapInfoWindow from 'vue2-google-maps/src/components/infoWindow';
Vue.use(VueGoogleMaps, {
  load: {
    key: 'your API token',
    libraries: 'places',
    region: 'TW',
    language: 'en',
  },
  installComponents: false,
});
Vue.component('GmapMap', GmapMap)
Vue.component('GmapMarker', GmapMarker)
Vue.component('GmapInfoWindow', GmapInfoWindow)







