<script setup lang="ts">
import { NPCGenerator, Randomizer } from "@randomgeekdom/rollbard";
import { provide } from "vue";
import { RouterView } from "vue-router";
import Constants from "./models/Constants";
import FateCoreCharacterGenerationService from "./services/FateCoreCharacterGenerationService";
import FateCoreCharacterRepository from "./services/FateCoreCharacterLocalRepository";
import IFateCoreCharacterGenerationService from "./services/interfaces/IFateCoreCharacterGenerationService";
import IFateCoreCharacterRepository from "./services/interfaces/IFateCoreCharacterRepository";
import UpdatesService from "./services/UpdatesService";

var randomizer = new Randomizer();
var npcGenerator = new NPCGenerator(randomizer);
provide(Constants.Randomizer, randomizer);
provide(Constants.UpdatesService, new UpdatesService());
provide<IFateCoreCharacterGenerationService>(
  Constants.FateCoreCharacterGenerationService,
  new FateCoreCharacterGenerationService(npcGenerator, randomizer)
);
provide<IFateCoreCharacterRepository>(
  Constants.FateCoreCharacterRepository,
  new FateCoreCharacterRepository()
);
</script>
<template>
  <RouterView />
</template>
