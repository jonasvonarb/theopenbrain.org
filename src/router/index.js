import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/LandingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "landing",
      component: HomeView,
    },
    {
      path: "/home",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/chapter",
      name: "chapter",
      component: () => import("../views/ChapterView.vue"),
    },
    {
      path: "/glossary",
      name: "glossary",
      component: () => import("../views/GlossaryView.vue"),
    },
  ],
});

export default router;
