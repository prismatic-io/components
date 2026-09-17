import type { drive_v3 } from "googleapis";
export interface PaginationParams<TInitialParams> {
  drive: drive_v3.Drive;
  initialParams: TInitialParams;
  fetchAll: boolean;
}
