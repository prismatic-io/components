export interface EnsVerificationRequest {
  callbackId: string;
  verificationKey: string;
}

export interface EnsBodyData {
  callbackId?: string;
  verificationKey?: string;
  [key: string]: unknown;
}
