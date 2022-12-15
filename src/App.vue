<script setup lang="ts">
import { NPCGenerator, Randomizer } from "@randomgeekdom/rollbard";
import { provide } from "vue";
import { RouterView } from "vue-router";
import Constants from "./models/Constants";
import FateCoreCharacterGenerationService from "./services/FateCoreCharacterGenerationService";
import ServiceLocator from "./services/ServiceLocator";
import UpdatesService from "./services/UpdatesService";

var randomizer = new Randomizer();
var npcGenerator = new NPCGenerator(randomizer);
provide(Constants.Randomizer, randomizer);
provide(Constants.UpdatesService, new UpdatesService());
provide(
  Constants.FateCoreCharacterGenerationService,
  new FateCoreCharacterGenerationService(npcGenerator, randomizer)
);
</script>
<template>
  <RouterView />
</template>
