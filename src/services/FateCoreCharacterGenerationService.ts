import FateCoreCharacter from "../models/FateCore/FateCoreCharacter";
import { NPCGenerator, Gender, Randomizer } from "@randomgeekdom/rollbard";
import FateCoreSkill from "../models/FateCore/FateCoreSkill";
import IFateCoreCharacterGenerationService from "./interfaces/IFateCoreCharacterGenerationService";

export default class FateCoreCharacterGenerationService implements IFateCoreCharacterGenerationService {
    constructor(private npcGenerator: NPCGenerator, private randomizer: Randomizer) { }

    GenerateCharacter(): FateCoreCharacter {
        var character = new FateCoreCharacter();
        var npc = this.npcGenerator.Generate();

        character.name = npc.Name;
        character.pronouns = this.GetPronoun(npc.Gender);

        let skills = Object.assign([], this.skills).sort();

        for(let i = 0; i < this.GetNumberOfSkills(); i++){
            var skill = this.randomizer.GetRandomElement(skills);
            var characterSkill = new FateCoreSkill();
            characterSkill.name = skill;

            for(let j = 1; j < 8; j++){
                var skillsAtLevel = this.GetSkillsAtLevel(character.skills, j);
                var skillsAtLevelPlus1 = this.GetSkillsAtLevel(character.skills, j+1);

                if(skillsAtLevel <= skillsAtLevelPlus1)
                {
                    characterSkill.level = j;
                    break;
                }
                else if(skillsAtLevel != skillsAtLevelPlus1 + 1){
                    characterSkill.level = j+1
                    break;
                }
            }

            character.skills.push(characterSkill);

            skills.splice(skills.indexOf(skill), 1);
        }

        return character;
    }

    private GetSkillsAtLevel(skills: FateCoreSkill[], level: number): number{
        return skills.filter(x=>x.level == level).length;
    }

    private GetPronoun(gender: Gender): string {
        switch (gender) {
            case Gender.Female:
                return "She/Her";
            case Gender.Male:
                return "He/Him";
            default:
                return "They/Them";
        }
    };

    private GetNumberOfSkills(): number{
        return 10;
    }

    private skills = [
        "Athletics",
        "Burglary",
        "Contacts",
        "Crafts",
        "Deceive",
        "Drive",
        "Empathy",
        "Fight",
        "Investigate",
        "Lore",
        "Notice",
        "Physique",
        "Provoke",
        "Rapport",
        "Resources",
        "Shoot",
        "Stealth",
        "Will"
    ];
}