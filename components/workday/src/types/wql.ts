import type { WorkdayListResponse } from "./pagination";

export type WqlResponse = WorkdayListResponse;

export interface WqlPageParams {
  limit?: number;
  offset?: number;
}
