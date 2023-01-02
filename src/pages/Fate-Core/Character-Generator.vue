<script setup lang="ts">
import { Randomizer } from "@randomgeekdom/rollbard";
import { ref, Ref } from "vue";
import Constants from "../../models/Constants";
import FateCoreCharacter from "../../models/FateCore/FateCoreCharacter";
import IFateCoreCharacterGenerationService from "../../services/interfaces/IFateCoreCharacterGenerationService";
import IFateCoreCharacterRepository from "../../services/interfaces/IFateCoreCharacterRepository";
import ServiceLocator from "../../services/ServiceLocator";
import Lucide from "../../base-components/Lucide";

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

  let level = Math.max(...character.value.skills.map((o) => o.level));
  let arr: { level: number; skills: string[] }[] = [];

  while (level >= 1) {
    arr.push({
      level: level,
      skills: character.value.skills.filter((x) => x.level == level).map((x) => x.name),
    });
    level--;
  }

  SkillList.value = arr;
};

let SaveCharacter = function () {
  characters.value.push(character.value);
  fateCoreCharacterRepository?.SaveAllAsync(characters.value);
};

let LoadCharacters = async function () {
  if (fateCoreCharacterRepository) {
    var response = await fateCoreCharacterRepository.GetAsync();
    debugger;
    characters.value = response || [];
  }
};

let Load = function (c: FateCoreCharacter) {
  SetCharacter(c);
};

let Delete = function (c: FateCoreCharacter) {
  const index = characters.value.indexOf(c, 0);
  if (index > -1) {
    characters.value.splice(index, 1);
  }
  fateCoreCharacterRepository?.SaveAllAsync(characters.value);
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
      <div>Name: {{ character?.name }}</div>
      <div>Pronouns: {{ character?.pronouns }}</div>
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
  <br />
  <div class="flex">
    <button @click="RollSkill(0)">Roll</button>
    <div v-if="ShowDice" v-for="die in dice">
      <div v-if="die == -1">
        <Lucide icon="PlusSquare" />
      </div>
      <div v-if="die == 0">
        <Lucide icon="Square" />
      </div>
      <div v-if="die == 1">
        <Lucide icon="MinusSquare" />
      </div>
    </div>
    <h6>&nbsp; {{ TotalDiceValue }}</h6>
  </div>
  <br />
  <div class="flex items-center mt-8 intro-y">
    <div v-for="c in characters">
      <button @click="Delete(c)">
        <Lucide icon="Trash" />
      </button>
      <button @click="Load(c)">{{ c.name }}</button>
    </div>
  </div>
  <!-- END: Page Layout -->
</template>
