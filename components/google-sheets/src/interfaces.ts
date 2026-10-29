import type { drive_v3 } from "@googleapis/drive";

export interface PaginationParams {
  drive: drive_v3.Drive;
  initialParams: drive_v3.Params$Resource$Files$List;
  fetchAll: boolean;
}
