import FateCoreCharacter from "../../models/FateCore/FateCoreCharacter";

export default interface IFateCoreCharacterRepository{
    Get(): FateCoreCharacter[];
    Save(character: FateCoreCharacter): void;
}