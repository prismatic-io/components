export interface AuthorizableRequest {
  method: string;
  url: string;
  params?: Array<[string, string]>;
}
export interface StoreConfig {
  environmentUrl: string;
  authorize: (request: AuthorizableRequest) => string;
}
