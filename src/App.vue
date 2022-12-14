<script setup lang="ts">
import { provide } from "vue";
import { RouterView } from "vue-router";
import Constants from "./models/Constants";
import UpdatesService from "./services/UpdatesService";

provide(Constants.UpdatesService, new UpdatesService());
</script>
<template>
  <RouterView />
</template>
