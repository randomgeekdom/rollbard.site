import { inject } from "vue";

export default class ServiceLocator{
    static GetService<T>(name: string): T | undefined{
        return inject(name);
    }
}