export interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export interface AsposeClientProps {
  clientId: string;
  clientSecret: string;
  baseUrl: string;
}

export interface AsposeTokenProps {
  token: string;
}
