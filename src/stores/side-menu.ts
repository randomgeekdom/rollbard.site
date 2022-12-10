import { defineStore } from "pinia";
import { Icon } from "../base-components/Lucide/Lucide.vue";

export interface Menu {
  icon: Icon;
  title: string;
  pageName?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | "devider">;
}

export const useSideMenuStore = defineStore("sideMenu", {
  state: (): SideMenuState => ({
    menu: [
      {
        icon: "Home",
        pageName: "home",
        title: "Home",
      },
      {
        icon: "Activity",
        pageName: "side-menu-page-2",
        title: "Page 2",
      },
    ],
  }),
});
