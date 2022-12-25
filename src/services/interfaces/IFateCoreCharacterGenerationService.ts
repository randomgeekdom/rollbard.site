import FateCoreCharacter from "../../models/FateCore/FateCoreCharacter";

export default interface IFateCoreCharacterGenerationService{
    GenerateCharacter(): FateCoreCharacter;
}