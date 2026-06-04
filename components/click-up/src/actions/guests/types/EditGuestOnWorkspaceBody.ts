export interface EditGuestOnWorkspaceBody {
  username: string;
  can_edit_tags: boolean;
  can_see_time_spent: boolean;
  can_see_time_estimated: boolean;
  can_create_views: boolean;
  custom_role_id: number;
}
