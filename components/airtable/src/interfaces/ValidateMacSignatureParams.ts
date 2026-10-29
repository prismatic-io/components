import type { ActionLogger, TriggerPayload } from "@prismatic-io/spectral";

export interface ValidateMacSignatureParams {
  macSecret: string;
  payload: TriggerPayload;
  logger: ActionLogger;
  debug: boolean;
}
