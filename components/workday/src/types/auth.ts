export interface CachedToken {
  accessToken: string;
  expiresAt: number;
}

export interface WorkdayEndpoint {
  baseUrl: string;
  tenant: string;
}
