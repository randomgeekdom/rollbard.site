

<script setup lang="ts">
import TopBar from "../../components/TopBar";
import { HomeRoutes } from "../../router";

const routes = HomeRoutes;

</script>
<template>
  
  <TopBar :routes="HomeRoutes"/>
  <RouterView></RouterView>
</template>
<script>
</script>