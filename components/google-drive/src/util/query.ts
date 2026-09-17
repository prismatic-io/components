import { MY_DRIVE } from "../constants";
export const getDriveQueryParams = (
  driveId: string,
):
  | {
      supportsAllDrives: boolean;
      includeItemsFromAllDrives: boolean;
      corpora: string;
      driveId?: undefined;
    }
  | {
      driveId: string;
      supportsAllDrives: boolean;
      includeItemsFromAllDrives: boolean;
      corpora: string;
    } => {
  if (driveId === MY_DRIVE) {
    return {
      supportsAllDrives: false,
      includeItemsFromAllDrives: false,
      corpora: "user",
    };
  }
  return {
    driveId,
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
    corpora: driveId ? "drive" : undefined,
  };
};
export const buildActivityFilter = (
  windowStart: string,
  triggerEvents: string[],
): string => {
  const timeClause = `time > "${windowStart}"`;
  return triggerEvents.length > 0
    ? `${timeClause} AND detail.action_detail_case:(${triggerEvents.join(" ")})`
    : timeClause;
};
export const escapeDriveQueryValue = (value: string): string =>
  value.replace(/\\/g, "\\\\").replace(/'/g, "\\'");
