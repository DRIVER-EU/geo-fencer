import Vue from "vue";
import { CsPlugin, CsApp } from "@csnext/cs-client";
import { GeoFencerProject } from './GeoFencerProjectLayout';

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// https://github.com/FortAwesome/vue-fontawesome

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSyncAlt, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSyncAlt);
library.add(faCheckCircle);
library.add(faTimesCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

// load cs plugin
Vue.use(CsPlugin);

// initialize CsApp component as main app component
const app = new Vue({
  render: h => h(CsApp as any)
}).$mount("#geofencer_app"); // See .\dashboard\public\index.html


// init cs with project definition
app.$cs.init(GeoFencerProject);

// for console debugging purposes
(<any>window).cs = app.$cs;

