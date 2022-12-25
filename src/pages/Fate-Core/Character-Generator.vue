<script setup lang="ts">
import { Randomizer } from "@randomgeekdom/rollbard";
import { ref, Ref } from "vue";
import Constants from "../../models/Constants";
import FateCoreCharacter from "../../models/FateCore/FateCoreCharacter";
import IFateCoreCharacterGenerationService from "../../services/interfaces/IFateCoreCharacterGenerationService";
import IFateCoreCharacterRepository from "../../services/interfaces/IFateCoreCharacterRepository";
import ServiceLocator from "../../services/ServiceLocator";

let character: Ref<FateCoreCharacter> = ref(new FateCoreCharacter());
let characters: Ref<FateCoreCharacter[]> = ref([]);

var fateCoreCharacterGenerationService = ServiceLocator.GetService<IFateCoreCharacterGenerationService>(
  Constants.FateCoreCharacterGenerationService
);
var fateCoreCharacterRepository = ServiceLocator.GetService<IFateCoreCharacterRepository>(
  Constants.FateCoreCharacterRepository
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

  SetCharacter(fateCoreCharacterGenerationService?.GenerateCharacter());
};

let SetCharacter = function (c: FateCoreCharacter) {
  character.value = c;

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

let SaveCharacter = function () {
  fateCoreCharacterRepository?.Save(character.value);
  characters.value.push(character.value);
};

let LoadCharacters = function () {
  characters.value = fateCoreCharacterRepository?.Get() || [];
};

let Load = function (c: FateCoreCharacter) {
  SetCharacter(c);
};

const TotalDiceValue = ref("");

GenerateCharacter();
LoadCharacters();

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
    diceResult + " (Dice Result) + " + level + " (Modifier) = " + (diceResult + level);

  ShowDice.value = true;
};
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <div class="mx-1"><button @click="GenerateCharacter()">Generate</button></div>
    <div class="mx-1"><button @click="SaveCharacter()">Save Character</button></div>
  </div>
  <!-- BEGIN: Page Layout -->
  <div class="p-5 mt-5 intro-y box">
    <form>
      <div>Name: {{ character?.Name }}</div>
      <div>Pronouns: {{ character?.Pronouns }}</div>
      <div v-for="skillLevel in SkillList">
        +{{ skillLevel.level }}
        <button
          type="button"
          @click="RollSkill(skillLevel.level)"
          class="mx-3"
          v-for="skill in skillLevel.skills"
        >
          {{ skill }}
        </button>
      </div>
    </form>
  </div>
  <div class="px-5">
    <button @click="RollSkill(0)">Roll</button>
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
  <div class="flex items-center mt-8 intro-y">
    <div v-for="c in characters">
      <button @click="Load(c)">{{ c.Name }}</button>
    </div>
  </div>
  <!-- END: Page Layout -->
</template>
