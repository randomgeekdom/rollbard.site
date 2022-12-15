<script setup lang="ts">
import { inject, Ref, ref } from "vue";
import Constants from "../../models/Constants";
import ServiceLocator from "../../services/ServiceLocator";
import UpdatesService from "../../services/UpdatesService";
import update from "../../types/update";

let updatesService = ServiceLocator.GetService<UpdatesService>(Constants.UpdatesService);

const updates: Ref<update[]> = ref([]);
if (updatesService != null) {
  updates.value = updatesService?.GetUpdates();
}
</script>

<template>
  <div>
    <h2 class="mr-auto text-lg font-medium">Welcome</h2>
    <div class="p-5 mt-5 intro-y box">
      Rollbard is a site dedicated to tabletop RPGs. I personally made it to help me with
      resources to run my own games and to keep up with my software development skills.
      Hopefully, you can find some use as well.
    </div>
  </div>

  <div v-for="update in updates">
    <h2 class="mr-auto text-lg font-medium">
      {{ update.Title }} - {{ update.Date.toDateString() }}
    </h2>
    <div class="p-5 mt-5 intro-y box">{{ update.Text }}</div>
  </div>
</template>
