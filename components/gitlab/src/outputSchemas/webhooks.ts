import { bool, list, nullableStr, num, obj, str } from "./shared";
export const hookSchema = obj({
  id: num,
  url: str,
  name: nullableStr,
  description: nullableStr,
  project_id: num,
  created_at: str,
  push_events: bool,
  push_events_branch_filter: nullableStr,
  tag_push_events: bool,
  issues_events: bool,
  confidential_issues_events: bool,
  note_events: bool,
  confidential_note_events: bool,
  merge_requests_events: bool,
  pipeline_events: bool,
  job_events: bool,
  wiki_page_events: bool,
  releases_events: bool,
  deployment_events: bool,
  milestone_events: bool,
  feature_flag_events: bool,
  repository_update_events: bool,
  resource_access_token_events: bool,
  enable_ssl_verification: bool,
  alert_status: str,
  disabled_until: nullableStr,
  url_variables: list(obj({ key: str })),
  custom_webhook_template: nullableStr,
  custom_headers: list(obj({ key: str })),
  token_present: bool,
  signing_token_present: bool,
});
export const hookListSchema = list(hookSchema);
export const listProjectWebhooksOutputSchema = hookListSchema;
export const deletedHooksSchema = obj({
  deleted: list(obj({ projectId: str, hookId: num })),
});
export const deleteInstancedWebhooksOutputSchema = deletedHooksSchema;
