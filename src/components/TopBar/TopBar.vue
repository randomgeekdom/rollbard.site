<script setup lang="ts">
import { ref } from "vue";
import Lucide from "../../base-components/Lucide";
import Breadcrumb from "../../base-components/Breadcrumb";
import { FormInput } from "../../base-components/Form";
import { Menu, Popover } from "../../base-components/Headless";
import fakerData from "../../utils/faker";
import _ from "lodash";
import { TransitionRoot } from "@headlessui/vue";
import RouteInfo from "../../types/RouteInfo";
import { useAuth0 } from "@auth0/auth0-vue";
import logoUrl from "../../assets/images/logo.svg";

const searchDropdown = ref(false);
const showSearchDropdown = () => {
  searchDropdown.value = true;
};
const hideSearchDropdown = () => {
  searchDropdown.value = false;
};

const props = defineProps<{
  routes: RouteInfo[];
}>();

const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
</script>

<template>
  <!-- BEGIN: Top Bar -->
  <div class="h-[67px] z-[51] flex items-center relative border-b border-slate-200">
    <button
      class="mr-auto -intro-x sm:flex"
      v-for="route in routes"
      :to="'{name:' + route.name + '}'"
    >
      {{ route.display }}
    </button>
    <!-- END: Breadcrumb -->

    <!-- BEGIN: Account Menu -->
    <Menu>
      <Menu.Button
        class="block w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in intro-x"
      >
        <img
          alt="Midone Tailwind HTML Admin Template"
          v-if="isAuthenticated"
          :src="user?.picture"
        />
        <Lucide icon="Lock" v-if="!isAuthenticated" />
      </Menu.Button>
      <Menu.Items class="w-56 mt-px text-white bg-primary">
        <Menu.Header class="font-normal" v-if="isAuthenticated">
          <div class="font-medium">{{ user?.name }}</div>
          <div class="text-xs text-white/70 mt-0.5 dark:text-slate-500">
            {{ user?.email }}
          </div>
        </Menu.Header>
        <Menu.Devider class="bg-white/[0.08]" />
        <Menu.Item class="hover:bg-white/5" @click="logout()" v-if="isAuthenticated">
          <Lucide icon="ToggleLeft" class="w-4 h-4 mr-2" /> Logout
        </Menu.Item>
        <Menu.Item
          class="hover:bg-white/5"
          @click="loginWithRedirect()"
          v-if="!isAuthenticated"
        >
          <Lucide icon="ToggleRight" class="w-4 h-4 mr-2" /> Login
        </Menu.Item>
      </Menu.Items>
    </Menu>
  </div>
  <!-- END: Top Bar -->
</template>
