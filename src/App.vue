<script setup lang="ts">
import { NPCGenerator, Randomizer } from "@randomgeekdom/rollbard";
import { provide } from "vue";
import { RouterView } from "vue-router";
import Constants from "./models/Constants";
import ApiService from "./services/ApiService";
import FateCoreCharacterGenerationService from "./services/FateCoreCharacterGenerationService";
import FateCoreCharacterRepository from "./services/FateCoreCharacterRepository";
import { IApiService } from "./services/interfaces/IApiService";
import IFateCoreCharacterGenerationService from "./services/interfaces/IFateCoreCharacterGenerationService";
import IFateCoreCharacterRepository from "./services/interfaces/IFateCoreCharacterRepository";
import UpdatesService from "./services/UpdatesService";

var randomizer = new Randomizer();
var npcGenerator = new NPCGenerator(randomizer);
var apiService = new ApiService();

provide<IApiService>(Constants.ApiService, apiService);
provide(Constants.Randomizer, randomizer);
provide(Constants.UpdatesService, new UpdatesService());
provide<IFateCoreCharacterGenerationService>(
  Constants.FateCoreCharacterGenerationService,
  new FateCoreCharacterGenerationService(npcGenerator, randomizer)
);
provide<IFateCoreCharacterRepository>(
  Constants.FateCoreCharacterRepository,
  new FateCoreCharacterRepository(apiService)
);
</script>
<template>
  <Suspense>
    <RouterView />
    <template #fallback>
      <img src="./assets/images/loading.gif" />
    </template>
  </Suspense>
</template>
