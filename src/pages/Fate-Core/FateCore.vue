

<script setup lang="ts">
import TopBar from "../../components/TopBar";
import { FateCoreRoutes } from "../../router";

const routes = FateCoreRoutes;

</script>
<template>
  
  <TopBar :routes="FateCoreRoutes"/>
  <RouterView></RouterView>
</template>
<script>
</script>