import { useAuth0 } from "@auth0/auth0-vue";
import { IApiService } from "./interfaces/IApiService";
import settingsJson from "./settings.json";

export default class ApiService implements IApiService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  auth: any;
  constructor() {
    this.auth = useAuth0();
  }
  async GetAsync(url: string): Promise<Response> {
    const token = await this.auth.getAccessTokenSilently();
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    return fetch(settingsJson.ApiUrl + url, requestOptions);
  }

  async PostAsync<T>(url: string, body: T): Promise<Response> {
    const token = await this.auth.getAccessTokenSilently();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    };

    return fetch(settingsJson.ApiUrl + url, requestOptions);
  }
}
