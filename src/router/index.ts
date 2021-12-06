import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from "vue-router";
import Layout from "@/views/layout/index.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/views/main/home/index.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: () => import("@/views/404/index.vue"),
      },
    ],
  },
];

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let title = to.meta.title + " | 酬勤";
  if (!to.meta.title) {
    title = "酬勤";
  }
  document.title = title;

  const chouQinToken = localStorage.getItem("chouqin_token");
  if (to.path !== "/login") {
    if (chouQinToken) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

export default router;
