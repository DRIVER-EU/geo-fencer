// tslint:disable-next-line:ordered-imports
import { CsApp, CsPlugin } from "@csnext/cs-client";
import BootstrapVue from "bootstrap-vue";
// tslint:disable-next-line:no-submodule-imports
import "bootstrap-vue/dist/bootstrap-vue.css";
// tslint:disable-next-line:no-submodule-imports
import "bootstrap/dist/css/bootstrap.css";
import Vue from "vue";
import { GeoFencerProject } from "./GeoFencerProjectLayout";
import { NotificationService } from "./services/notification_service";

// https://github.com/FortAwesome/vue-fontawesome

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faSyncAlt, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faSyncAlt);
library.add(faCheckCircle);
library.add(faTimesCircle);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

// load cs plugin
Vue.use(CsPlugin);

// initialize CsApp component as main app component
const app = new Vue({
  render: (h) => h(CsApp as any),
}).$mount("#geofencer_app"); // See .\dashboard\public\index.html

// init cs with project definition
app.$cs.init(GeoFencerProject);

NotificationService.getInstance().connect();

// for console debugging purposes
(window as any).cs = app.$cs;
