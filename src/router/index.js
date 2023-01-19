import { createRouter, createWebHistory } from "vue-router";
import { useGeneral } from "@/stores";
import HomeView from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    meta: { transition: "aboutTo" },
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/chapter/:chapter?",
    name: "chapter",
    component: () => import("../views/ChapterView.vue"),
  },
  {
    path: "/chapter/break/:video?",
    name: "break",
    component: () => import("../views/BreakView.vue"),
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
    const store = useGeneral();
    if (savedPosition || store.savedPosition) {
      return savedPosition || store.savedPosition;
    } else {
      return { top: 0 };
    }
  },
});
router.beforeEach((to, from) => {
  const store = useGeneral();
  if (from.name === "chapter") {
    let scrollOffset = { top: window.scrollY };
    store.savedPosition = scrollOffset;
  }

  if (from.name === "about") {
    to.meta = { transitionName: "aboutLeave" };
  }
  if (to.name === "about") {
    to.meta = { transitionName: "aboutTo" };
  }
  if (to.name == "home" && from.name == "chapter") {
    store.activeMenu = true;
  }
});

export default router;
