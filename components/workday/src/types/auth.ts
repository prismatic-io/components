export interface CachedToken {
  accessToken: string;
  expiresAt: number;
}

export interface ForceRefreshOptions {
  forceRefresh?: boolean;
}

export interface WorkdayEndpoint {
  baseUrl: string;
  tenant: string;
}
