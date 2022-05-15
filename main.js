import App from './App'


import * as navTo from '@/libs/navTo'

import * as data from '@/libs/data'

Vue.prototype.$data = data;
Vue.prototype.$navto = navTo;

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
// #endif



// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
