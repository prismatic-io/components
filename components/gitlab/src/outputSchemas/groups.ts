import {
  bool,
  list,
  nullableBool,
  nullableNum,
  nullableStr,
  num,
  obj,
  str,
  visibilityEnum,
} from "./shared";
const groupProperties = {
  id: num,
  name: str,
  path: str,
  full_name: str,
  full_path: str,
  description: nullableStr,
  visibility: visibilityEnum,
  avatar_url: nullableStr,
  web_url: str,
  parent_id: nullableNum,
  created_at: str,
  share_with_group_lock: bool,
  require_two_factor_authentication: bool,
  two_factor_grace_period: num,
  project_creation_level: str,
  auto_devops_enabled: nullableBool,
  subgroup_creation_level: str,
  emails_enabled: nullableBool,
  mentions_disabled: nullableBool,
  lfs_enabled: bool,
  default_branch: nullableStr,
  default_branch_protection: num,
  default_branch_protection_defaults: {
    type: "object",
    additionalProperties: true,
  },
  request_access_enabled: bool,
  repository_storage: str,
  file_template_project_id: nullableNum,
  ip_restriction_ranges: nullableStr,
};
export const groupSchema = obj(groupProperties);
export const groupDetailSchema = obj({
  ...groupProperties,
  runners_token: str,
  enabled_git_access_protocol: str,
  shared_with_groups: list(
    obj({
      group_id: num,
      group_name: str,
      group_full_path: str,
      group_access_level: num,
      expires_at: nullableStr,
    }),
  ),
  prevent_sharing_groups_outside_hierarchy: bool,
  only_allow_merge_if_pipeline_succeeds: bool,
  allow_merge_on_skipped_pipeline: bool,
  only_allow_merge_if_all_discussions_are_resolved: bool,
  math_rendering_limits_enabled: bool,
  lock_math_rendering_limits_enabled: bool,
  require_sha_for_merge: bool,
  lock_require_sha_for_merge: bool,
});
export const groupListSchema = list(groupSchema);
export const getGroupOutputSchema = groupDetailSchema;
export const listGroupsOutputSchema = groupListSchema;
