import FateCoreCharacter from "../models/FateCore/FateCoreCharacter";
import IFateCoreCharacterRepository from "./interfaces/IFateCoreCharacterRepository";

export default class FateCoreCharacterLocalRepository implements IFateCoreCharacterRepository{
    CHARACTERS: string = "FATE_CORE_CHARACTERS";
    async GetAsync(): Promise<FateCoreCharacter[]>{
        var characters = localStorage.getItem(this.CHARACTERS);
        if(!characters){
            return [];
        }
        
        var charactersParsed = <FateCoreCharacter[]>JSON.parse(characters || "");
        return charactersParsed;
    }

    async SaveAsync(character: FateCoreCharacter): Promise<void>{
        var characters = await this.GetAsync();
        characters.push(character);
        localStorage.setItem(this.CHARACTERS, JSON.stringify(characters));
    }

    async SaveAllAsync(characters: FateCoreCharacter[]): Promise<void>{
        localStorage.setItem(this.CHARACTERS, JSON.stringify(characters));
    }
}