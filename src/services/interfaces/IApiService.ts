export interface IApiService {
    GetAsync(url: string): Promise<Response>;
    PostAsync<T>(url: string, body: T): Promise<Response>;
  }
  