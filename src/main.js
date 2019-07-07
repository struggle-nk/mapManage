// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Qs from 'qs'
/*element相关*/
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
/*公用样式css*/
import './assets/css/common.css'

/*sass混入存放地址*/
import './assets/css/mixin.scss'

/*解决scoped问题elementui修改样式存放地址*/
import './assets/css/elementreset.scss'

/*处理兼容问题css*/
import './assets/css/hack.scss'

import 'babel-polyfill'

//axios二次封装和接口统一管理
// import ajax from './assets/js/http'
import axios from 'axios'
import apiUrl from './publicUrl';
Vue.prototype.$ajax = axios;
Vue.prototype.$apiUrl = apiUrl;
Vue.prototype.$params = Qs;
// import ApiSetting from './assets/js/api'
// Vue.prototype.ApiSetting = ApiSetting;
// Vue.prototype.httpServer = ajax;

// vuex引用
// import store from './store/store'

Vue.use(Element);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  components: { App },
  template: '<App/>'
});
