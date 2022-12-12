<script setup lang="ts">
import { NPC, NPCGenerator, Randomizer, Gender } from "@randomgeekdom/rollbard";
import { ref, Ref } from "vue";

let randomizer = new Randomizer();
let npcGenerator = new NPCGenerator(randomizer);

let character: Ref<NPC> = ref(npcGenerator.Generate());

let GenerateCharacter = function () {
  character.value = npcGenerator.Generate();
};

let GetPronoun = function(gender: Gender): string{
  switch(gender){
    case Gender.Female:
      return "She/Her";
    case Gender.Male:
      return "He/Him";
    default:
      return "They/Them";
  }
}
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <button @click="GenerateCharacter()">Generate</button>
  </div>
  <!-- BEGIN: Page Layout -->
  <div class="p-5 mt-5 intro-y box">
    <form>
      <div>
        Name: {{ character?.Name }}
      </div>
      <div>
        Pronouns: {{GetPronoun(character.Gender)}}
      </div>
    </form>
  </div>
  <!-- END: Page Layout -->
</template>
