export interface AuthResponse {
  token: string;
  refresh_token: string;
  user_id: number;
}

export interface RefreshTokenResponse {
  token: string;
  refresh_token: string;
}

export interface CachedTokens {
  token: string;
  refreshToken: string;
}

export type CrossFlowState = Record<string, unknown>;
