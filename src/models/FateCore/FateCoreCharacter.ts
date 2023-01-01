import FateCoreSkill from "./FateCoreSkill";

export default class FateCoreCharacter{
    name = "";
    pronouns = "";
    skills: FateCoreSkill[] = [];
    aspects: string[] = [];
    stunts: string[] = [];
}