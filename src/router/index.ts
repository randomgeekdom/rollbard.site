import { createRouter, createWebHistory } from "vue-router";
import SideMenu from "../layouts/SideMenu/SideMenu.vue";
import SimpleMenu from "../layouts/SimpleMenu/SimpleMenu.vue";
import TopMenu from "../layouts/TopMenu/TopMenu.vue";
import Home from "../pages/Home/Home.vue";
import Updates from "../pages/Home/Updates.vue";
import FateCore from "../pages/Fate-Core/FateCore.vue";
import CharacterGenerator from "../pages/Fate-Core/Character-Generator.vue";
import RouteInfo from "../types/RouteInfo";

export const HomeRoutes: RouteInfo[] = [
  {
    path:"updates",
    name:"Updates",
    component:Updates,
    display: "Updates"
  }
];

export const FateCoreRoutes: RouteInfo[] = [
  {
    path:"character-generator",
    name:"FC-Character-Generator",
    component:CharacterGenerator,
    display: "Character Generator"
  }
];

const routes = [
  {
    path: "/",
    component: SideMenu,
    children: [
      {
        path:"/",
        redirect:"/home/updates"
      },
      {
        path: "home",
        name: "Home",
        component: Home,
        children: HomeRoutes
      },
      {
        path: "fate-core",
        name: "FateCore",
        component: FateCore,
        children: FateCoreRoutes
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 };
  },
});

export default router;
