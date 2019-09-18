import Vue from "vue";
import Router from "vue-router";

//使用router包
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ "@/views/login")
    },
    {
      //路由重定向
      path: "/",
      redirect: "/home"
    },
    {
      path: "/",
      component: () => import("@/views/Tabbar"),
      children: [
        {
          path: "home",
          component: () => import("@/views/home")
        }
      ]
    }
  ]
});
