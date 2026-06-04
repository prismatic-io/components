export interface PollingStateBase {
  errorCount: number;
  consecutiveErrors: number;
}

export interface IdocPollingState extends PollingStateBase {
  lastDocnum: string;
}
