import type { driveactivity_v2 } from "googleapis";
import type { ListChange, ListChangesResponse } from "../types";
export const resolveListChangeItems = (
  data: ListChangesResponse | undefined,
): ListChange[] => data?.changes ?? [];
export const resolveDriveActivities = (
  data: driveactivity_v2.Schema$DriveActivity[] | undefined,
): driveactivity_v2.Schema$DriveActivity[] => data ?? [];
