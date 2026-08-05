export const WEBHOOK_SECRETS_STATE_KEY_PREFIX = "asana-webhook-secrets";
export const WEBHOOK_SECRET_STATE_KEY_PREFIX = "asana-webhook-secret";
export const WEBHOOK_SECRETS_LEGACY_KEY = "webhookSecrets";
export const WEBHOOK_SECRET_LEGACY_KEY = "webhookSecret";
export const OPTIONAL_FIELDS =
  "projects,resource_subtype,assignee,assignee_status,created_at,completed,completed_at,dependencies,custom_fields,dependents,due_on,due_at,followers,external,is_rendered_as_separator,liked,likes,memberships,modified_at,name,notes,html_notes,num_likes,num_subtasks,parent,start_on,workspace,tags";
const COLOR_OPTIONS = [
  "dark-blue",
  "dark-brown",
  "dark-green",
  "dark-orange",
  "dark-pink",
  "dark-purple",
  "dark-red",
  "dark-teal",
  "dark-warm-gray",
  "light-blue",
  "light-green",
  "light-orange",
  "light-pink",
  "light-purple",
  "light-red",
  "light-teal",
  "light-warm-gray",
  "light-yellow",
];
export const COLOR_INPUT_OPTIONS = COLOR_OPTIONS.map((color) => ({
  label: color,
  value: color,
}));
export const TASK_OPT_FIELDS =
  "projects,resource_subtype,assignee,assignee_status,created_at,completed,completed_at,dependencies,custom_fields,dependents,due_on,due_at,followers,external,is_rendered_as_separator,liked,likes,memberships,modified_at,name,notes,html_notes,num_likes,num_subtasks,parent,start_at,start_on,workspace,tags";
export const PROJECT_OPT_FIELDS =
  "team,workspace,html_notes,notes,color,custom_field_settings,custom_fields,followers,members,archived,modified_at,created_at,start_on,due_on,current_status,owner,name,completed,completed_at";
export const CUSTOM_FIELD_OPT_FIELDS =
  "precision,enum_options,description,name,resource_subtype,text_value";
export const SECTION_OPT_FIELDS = "created_at,project,name";
export const TAG_OPT_FIELDS = "created_at,followers,name,color,workspace,notes";
export const TASK_FOLLOWERS_OPT_FIELDS = "created_at,followers,name,workspace";
export const USER_OPT_FIELDS = "name,email,workspaces";
