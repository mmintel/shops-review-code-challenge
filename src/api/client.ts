export interface ApiClient {
  get<T>(url: string): Promise<Response<T>>;
}

export interface Response<T> {
  data: T;
}
