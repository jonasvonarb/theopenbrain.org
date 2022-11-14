import { createRouter, createWebHistory } from "vue-router";
import { useGeneral } from "@/stores";
import HomeView from "@/views/LandingView.vue";

const routes = [
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
    path: "/chapter/:chapter?",
    name: "chapter",
    component: () => import("../views/ChapterView.vue"),
  },
  {
    path: "/chapter/chaptertocome/:chapter?",
    name: "chapternotfound",
    component: () => import("../views/ChapterNotFoundView.vue"),
  },
  {
    path: "/glossary",
    name: "glossary",
    component: () => import("../views/GlossaryView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      if (from.name) {
        return {
          el: to.hash,
          behavior: "smooth",
        };
      } else {
        return {
          el: to.hash,
          behavior: "auto",
        };
      }
    }
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
router.beforeEach((to, from) => {
  const store = useGeneral();
  if (to.name == "home") {
    store.activeMenu = true;
  }
  // store.unSetMenu();
});

export default router;
