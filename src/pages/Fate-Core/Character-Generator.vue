
<script setup lang="ts">
  import { NPC, NPCGenerator, Randomizer } from "@randomgeekdom/rollbard";
  import{ref, Ref} from "vue";
  
  let npcGenerator = new NPCGenerator(new Randomizer());

  let character: Ref<NPC> = ref(npcGenerator.Generate());  
  
  let GenerateCharacter = function()
  {
    character.value = npcGenerator.Generate();
  }

</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <button @click="GenerateCharacter()">Generate</button>
  </div>
  <!-- BEGIN: Page Layout -->
  <div class="p-5 mt-5 intro-y box">{{ character?.Name }}</div>
  <!-- END: Page Layout -->
</template>

