import FateCoreCharacter from "../../models/FateCore/FateCoreCharacter";

export default interface IFateCoreCharacterRepository{
    GetAsync(): Promise<FateCoreCharacter[] | undefined>;
    SaveAllAsync(characters: FateCoreCharacter[]): Promise<void>;
}