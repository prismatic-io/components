import type {
  CustomTaskIdsQueryParams,
  IncludeSharedQueryParams,
  PermissionLevelBody,
} from "./common";
export type AddGuestToFolderBody = PermissionLevelBody;
export type AddGuestToFolderQueryParams = IncludeSharedQueryParams;
export type AddGuestToListBody = PermissionLevelBody;
export type AddGuestToListQueryParams = IncludeSharedQueryParams;
export type AddGuestToTaskBody = PermissionLevelBody;
export interface AddGuestToTaskQueryParams
  extends IncludeSharedQueryParams,
    CustomTaskIdsQueryParams {
  custom_task_ids: boolean;
}
export interface EditGuestOnWorkspaceBody {
  username: string;
  can_edit_tags: boolean;
  can_see_time_spent: boolean;
  can_see_time_estimated: boolean;
  can_create_views: boolean;
  custom_role_id: number;
}
export interface InviteGuestToWorkspaceBody {
  email: string;
  can_edit_tags: boolean;
  can_see_time_spent: boolean;
  can_see_time_estimated: boolean;
  can_create_views: boolean;
  custom_role_id: number;
}
export type RemoveGuestFromFolderQueryParams = IncludeSharedQueryParams;
export type RemoveGuestFromListQueryParams = IncludeSharedQueryParams;
