import FateCoreCharacter from "../models/FateCore/FateCoreCharacter";
import IFateCoreCharacterRepository from "./interfaces/IFateCoreCharacterRepository";

export default class FateCoreCharacterRepository implements IFateCoreCharacterRepository{
    CHARACTERS: string = "FATE_CORE_CHARACTERS";
    Get(): FateCoreCharacter[]{
        var characters = localStorage.getItem(this.CHARACTERS);
        if(!characters){
            return [];
        }
        
        var charactersParsed = <FateCoreCharacter[]>JSON.parse(characters || "");
        return charactersParsed;
    }

    Save(character: FateCoreCharacter): void{
        var characters = this.Get();
        characters.push(character);
        localStorage.setItem(this.CHARACTERS, JSON.stringify(characters));
    }

    SaveAll(characters: FateCoreCharacter[]): void{
        localStorage.setItem(this.CHARACTERS, JSON.stringify(characters));
    }
}