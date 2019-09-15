import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//引入VeeValidate
// import VeeValidate from "vee-validate";

//引入vant组件
import Vant from "vant";
import "vant/lib/index.css";

//引入VeeValidate,从VeeValidate中单独导出Validator
import VeeValidate, { Validator } from "vee-validate";
//导入方言包
import zh_CN from "vee-validate/dist/locale/zh_CN.js";

//使用vant包
Vue.use(Vant);

//使用VeeValidate包
Vue.use(VeeValidate, {
  events: ""
});

//使用方言包
Validator.localize("zh_CN", zh_CN);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
