export interface DriveChangesResults {
  activities: Activity[];
  nextPageToken: string;
}

export interface Activity {
  primaryActionDetail: PrimaryActionDetail;
  actors: Actor[];
  actions: Action[];
  targets: Target[];
  timestamp: Date;
}

export interface Action {
  detail: Detail;
}

export interface Detail {
  create?: Create;
  edit?: Upload;
  permissionChange?: PermissionChange;
  move?: Move;
}

export interface Create {
  upload: Upload;
}

export type Upload = Record<string, unknown>;

export interface Move {
  addedParents: AddedParent[];
}

export interface AddedParent {
  driveItem: AddedParentDriveItem;
}

export interface AddedParentDriveItem {
  name: string;
  folder: Folder;
  driveFolder: Folder;
}

export interface Folder {
  type: string;
}

export interface PermissionChange {
  addedPermissions: AddedPermission[];
}

export interface AddedPermission {
  role: string;
  user: User;
}

export interface User {
  knownUser: KnownUser;
}

export interface KnownUser {
  personName: string;
  isCurrentUser: boolean;
}

export interface Actor {
  user: User;
}

export interface PrimaryActionDetail {
  create: Create;
}

export interface Target {
  driveItem: TargetDriveItem;
}

export interface TargetDriveItem {
  name: string;
  title: string;
  file: Upload;
  mimeType: string;
  owner: Actor;
  driveFile: Upload;
}

export interface SearchRecordsPollingState {
  lastPolledAt?: string;
}

import type { drive_v3 } from "googleapis";

export interface PaginationParams {
  drive: drive_v3.Drive;
  initialParams: drive_v3.Params$Resource$Files$List;
  fetchAll: boolean;
}

export interface DrivesPaginationParams {
  drive: drive_v3.Drive;
  initialParams: drive_v3.Params$Resource$Drives$List;
  fetchAll: boolean;
}

export interface ListChangesResult {
  kind: string;
  newStartPageToken: string;
  changes: {
    kind: string;
    removed: boolean;
    file: {
      kind: string;
      mimeType: string;
      id: string;
      name: string;
    };
    fileId: string;
    time: string;
    type: string;
    changeType: string;
  }[];
}

export interface ResolvedListChangesPageToken {
  value: string;
  isLegacy: boolean;
}
