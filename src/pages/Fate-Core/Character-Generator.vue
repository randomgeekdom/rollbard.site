<script setup lang="ts">
import { Randomizer } from "@randomgeekdom/rollbard";
import { ref, Ref } from "vue";
import Constants from "../../models/Constants";
import FateCoreCharacter from "../../models/FateCore/FateCoreCharacter";
import FateCoreCharacterGenerationService from "../../services/FateCoreCharacterGenerationService";
import ServiceLocator from "../../services/ServiceLocator";

let character: Ref<FateCoreCharacter> = ref(new FateCoreCharacter());

var fateCoreCharacterGenerationService = ServiceLocator.GetService<FateCoreCharacterGenerationService>(
  Constants.FateCoreCharacterGenerationService
);
var randomizer = ServiceLocator.GetService<Randomizer>(Constants.Randomizer);

let ShowDice = ref(false);
const dice = ref([0, 0, 0, 0]);

let arr: { level: number; skills: string[] }[] = [];
const SkillList = ref(arr);

let GenerateCharacter = function () {
  ShowDice.value = false;
  if (fateCoreCharacterGenerationService == null) {
    return;
  }

  character.value = fateCoreCharacterGenerationService?.GenerateCharacter();

  let level = Math.max(...character.value.Skills.map((o) => o.Level));
  let arr: { level: number; skills: string[] }[] = [];

  while (level >= 1) {
    arr.push({
      level: level,
      skills: character.value.Skills.filter((x) => x.Level == level).map((x) => x.Name),
    });
    level--;
  }

  SkillList.value = arr;
};

const TotalDiceValue = ref("");

GenerateCharacter();

const RollSkill = function (level: number): void {
  if (randomizer == null) {
    return;
  }

  dice.value = [
    (randomizer.GetRandomInt(10000) % 3) - 1,
    (randomizer.GetRandomInt(10000) % 3) - 1,
    (randomizer.GetRandomInt(10000) % 3) - 1,
    (randomizer.GetRandomInt(10000) % 3) - 1,
  ];

  let diceResult = dice.value[0] + dice.value[1] + dice.value[2] + dice.value[3];
  TotalDiceValue.value =
    "Result: " +
    diceResult +
    " (Dice Result) + " +
    level +
    " (Modifier) = " +
    (diceResult + level);

  ShowDice.value = true;
};
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <button @click="GenerateCharacter()">Generate</button>
  </div>
  <!-- BEGIN: Page Layout -->
  <div class="p-5 mt-5 intro-y box">
    <form>
      <div>Name: {{ character?.Name }}</div>
      <div>Pronouns: {{ character?.Pronouns }}</div>
      <div v-for="skillLevel in SkillList">
        +{{ skillLevel.level }}
        <a
          @click="RollSkill(skillLevel.level)"
          class="mx-3"
          v-for="skill in skillLevel.skills"
        >
          {{ skill }}
        </a>
      </div>
    </form>
  </div>
  <br />
  <div v-if="ShowDice" class="flex">
    <div v-for="die in dice">
      <img
        style="height: 75px; width: 75px"
        v-if="die == -1"
        src="../../assets/images/fate-die-minus.png"
      />
      <img
        style="height: 75px; width: 75px"
        v-if="die == 0"
        src="../../assets/images/fate-die-0.png"
      />
      <img
        style="height: 75px; width: 75px"
        v-if="die == 1"
        src="../../assets/images/fate-die-plus.png"
      />
    </div>
  </div>
  <br />
  <div>
    <p class="big-text">&nbsp; {{ TotalDiceValue }}</p>
  </div>
  <!-- END: Page Layout -->
</template>
<style>
.big-text {
  font-size: x-large;
}
</style>
