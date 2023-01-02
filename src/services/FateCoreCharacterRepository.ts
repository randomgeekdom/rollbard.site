import { IApiService } from './interfaces/IApiService';
import FateCoreCharacter from "../models/FateCore/FateCoreCharacter";
import FateCoreCharacterLocalRepository from "./FateCoreCharacterLocalRepository";
import IFateCoreCharacterRepository from "./interfaces/IFateCoreCharacterRepository";
import { useAuth0 } from '@auth0/auth0-vue'
import { Ref } from "vue";

export default class FateCoreCharacterRepository implements IFateCoreCharacterRepository {
    localRepository: FateCoreCharacterLocalRepository;
    auth0: { isAuthenticated: Ref<boolean> };

    constructor(private apiService: IApiService) {
        const z = useAuth0();
        z.getAccessTokenSilently
        this.auth0 = useAuth0();
        this.localRepository = new FateCoreCharacterLocalRepository();
    }

    CHARACTERS: string = "FATE_CORE_CHARACTERS";
    async GetAsync(): Promise<FateCoreCharacter[] | undefined> {
        if(!this.auth0.isAuthenticated?.value){
            return await this.localRepository.GetAsync();
        }
        var response = await this.apiService.GetAsync("api/fate-core/characters");
        return await response.json();
    }

    async SaveAllAsync(characters: FateCoreCharacter[]): Promise<void> {
        if(!this.auth0.isAuthenticated?.value){
            return await this.localRepository.SaveAllAsync(characters);
        }

        var response = await this.apiService.PostAsync("api/fate-core/characters", characters);
        return await response.json();
    }
}