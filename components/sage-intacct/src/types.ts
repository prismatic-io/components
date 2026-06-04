
export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
}




export interface SageIntacctRecord extends Record<string, unknown> {
  RECORDNO: string;
  WHENMODIFIED: string;
  WHENCREATED?: string;
}
