import Vue from "vue";
import Router from "vue-router";
import Todo from "@/components/Todo";
import LoginPage from "@/components/LoginPage";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "todo",
      component: Todo,
      meta: { requiresAuth: true }
    },
    {
      path: "/login",
      name: "LoginPage",
      component: LoginPage
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({
        name: "LoginPage"
      });
    }
  } else {
    next();
  }
});

export default router;
