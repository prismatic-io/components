import {
  bool,
  list,
  nullable,
  nullableNum,
  nullableStr,
  num,
  obj,
  str,
  userSchema,
} from "./shared";
export const labelSchema = obj({
  id: num,
  name: str,
  color: str,
  text_color: str,
  description: nullableStr,
  description_html: nullableStr,
  open_issues_count: num,
  closed_issues_count: num,
  open_merge_requests_count: num,
  subscribed: bool,
  priority: nullableNum,
  is_project_label: bool,
  archived: bool,
});
export const milestoneSchema = obj({
  id: num,
  iid: num,
  project_id: num,
  title: str,
  description: nullableStr,
  state: str,
  due_date: nullableStr,
  start_date: nullableStr,
  created_at: str,
  updated_at: str,
  expired: bool,
  web_url: str,
});
export const memberSchema = obj({
  ...userSchema.properties,
  access_level: num,
  created_at: str,
  created_by: userSchema,
  email: str,
  expires_at: nullableStr,
  group_saml_identity: nullable(
    obj({ extern_uid: str, provider: str, saml_provider_id: num }),
  ),
  membership_state: str,
});
export const labelListSchema = list(labelSchema);
export const milestoneListSchema = list(milestoneSchema);
export const memberListSchema = list(memberSchema);
export const listLabelsOutputSchema = labelListSchema;
export const listMilestonesOutputSchema = milestoneListSchema;
export const listProjectMembersOutputSchema = memberListSchema;
