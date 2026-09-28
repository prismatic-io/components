export interface Oauth1Credentials {
  consumerKey: string;
  consumerSecret: string;
  accessToken: string;
  accessTokenSecret: string;
}
export interface Oauth1Request {
  method: string;
  url: string;
  params: Array<[string, string]>;
  credentials: Oauth1Credentials;
  nonce?: string;
  timestamp?: string;
}
