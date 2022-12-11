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

const searchDropdown = ref(false);
const showSearchDropdown = () => {
  searchDropdown.value = true;
};
const hideSearchDropdown = () => {
  searchDropdown.value = false;
};

const props = defineProps<{
  routes: RouteInfo[]; 
}>()

</script>

<template>
  <!-- BEGIN: Top Bar -->
  <div class="h-[67px] z-[51] flex items-center relative border-b border-slate-200">
  
    <button class="mr-auto -intro-x sm:flex" v-for="route in routes"  :to="'{name:' + route.name +'}'">
      {{route.display}}
    </button>
    <!-- END: Breadcrumb -->
      
    <!-- BEGIN: Account Menu -->
    <Menu>
      <Menu.Button
        class="block w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in intro-x"
      >
        <img alt="Midone Tailwind HTML Admin Template" :src="fakerData[9].photos[0]" />
      </Menu.Button>
      <Menu.Items class="w-56 mt-px text-white bg-primary">
        <Menu.Header class="font-normal">
          <div class="font-medium">{{ fakerData[0].users[0].name }}</div>
          <div class="text-xs text-white/70 mt-0.5 dark:text-slate-500">
            {{ fakerData[0].jobs[0] }}
          </div>
        </Menu.Header>
        <Menu.Devider class="bg-white/[0.08]" />
        <Menu.Item class="hover:bg-white/5">
          <Lucide icon="User" class="w-4 h-4 mr-2" /> Profile
        </Menu.Item>
        <Menu.Item class="hover:bg-white/5">
          <Lucide icon="Edit" class="w-4 h-4 mr-2" /> Add Account
        </Menu.Item>
        <Menu.Item class="hover:bg-white/5">
          <Lucide icon="Lock" class="w-4 h-4 mr-2" /> Reset Password
        </Menu.Item>
        <Menu.Item class="hover:bg-white/5">
          <Lucide icon="HelpCircle" class="w-4 h-4 mr-2" /> Help
        </Menu.Item>
        <Menu.Devider class="bg-white/[0.08]" />
        <Menu.Item class="hover:bg-white/5">
          <Lucide icon="ToggleRight" class="w-4 h-4 mr-2" /> Logout
        </Menu.Item>
      </Menu.Items>
    </Menu>
  </div>
  <!-- END: Top Bar -->
</template>
