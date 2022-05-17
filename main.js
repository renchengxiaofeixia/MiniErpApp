import App from './App'

import request from '@/libs/request.js'
import * as api from '@/libs/api.js'
import * as navTo from '@/libs/navTo'


Vue.prototype.$navto = navTo;
Vue.prototype.$request = request;
Vue.prototype.$api = api;

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
