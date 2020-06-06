import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const Home = () => import("@/components/home/Home");

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ]
});

export default router;
