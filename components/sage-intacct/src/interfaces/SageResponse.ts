import type { SageOperation } from "./SageOperation";

export interface SageResponse {
  errormessage?: string;
  operation?: SageOperation;
}
