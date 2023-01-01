import FateCoreCharacter from "../../models/FateCore/FateCoreCharacter";

export default interface IFateCoreCharacterRepository{
    GetAsync(): Promise<FateCoreCharacter[]>;
    SaveAsync(character: FateCoreCharacter): Promise<void>;
    SaveAllAsync(characters: FateCoreCharacter[]): Promise<void>;
}