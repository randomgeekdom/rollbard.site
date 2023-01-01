// import FateCoreCharacter from "../models/FateCore/FateCoreCharacter";
// import FateCoreCharacterLocalRepository from "./FateCoreCharacterLocalRepository";
// import IFateCoreCharacterRepository from "./interfaces/IFateCoreCharacterRepository";
// import { useAuth0 } from '@auth0/auth0-vue'
// import { Ref } from "vue";

// export default class FateCoreCharacterRepository implements IFateCoreCharacterRepository {
//     localRepository: FateCoreCharacterLocalRepository;
//     auth0: { isAuthenticated: Ref<boolean> };

//     constructor() {
//         this.auth0 = useAuth0();
//         this.localRepository = new FateCoreCharacterLocalRepository();
//     }

//     CHARACTERS: string = "FATE_CORE_CHARACTERS";
//     Get(): FateCoreCharacter[] {
//         if(!this.auth0.isAuthenticated?.value){
//             return this.localRepository.Get();
//         }


//     }

//     Save(character: FateCoreCharacter): void {
//         if(!this.auth0.isAuthenticated?.value){
//             return this.localRepository.Save(character);
//         }
//     }

//     SaveAll(characters: FateCoreCharacter[]): void {
//         if(!this.auth0.isAuthenticated?.value){
//             return this.localRepository.SaveAll(characters);
//         }
//     }
// }