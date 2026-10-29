export const GRAPH_BASE_URL = "https://graph.microsoft.com";
export const GRAPH_API_VERSION = "v1.0";

export const SCOPES_FOR_AUTHORIZATION_CODE_FLOW =
  "https://graph.microsoft.com/Tasks.ReadWrite https://graph.microsoft.com/User.Read https://graph.microsoft.com/User.ReadBasic.All offline_access";

export const MAX_PAGES = 100;

export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const ETAG_RETRY_LIMIT = 2;

export const CONFLICT_STATUSES = [409, 412];

export const DIRECTORY_PAGE_SIZE = 999;

export const PERCENT_COMPLETE_DONE = 100;

export const DEFAULT_ORDER_HINT = " !";

export const ODATA_TYPE = {
  assignment: "#microsoft.graph.plannerAssignment",
  checklistItem: "#microsoft.graph.plannerChecklistItem",
  externalReference: "#microsoft.graph.plannerExternalReference",
} as const;

export const PLANNER_ENDPOINTS = {
  PLANS: "/planner/plans",
  PLAN: (planId: string) => `/planner/plans/${planId}`,
  PLAN_DETAILS: (planId: string) => `/planner/plans/${planId}/details`,
  PLAN_BUCKETS: (planId: string) => `/planner/plans/${planId}/buckets`,
  PLAN_TASKS: (planId: string) => `/planner/plans/${planId}/tasks`,
  GROUP_PLANS: (groupId: string) => `/groups/${groupId}/planner/plans`,
  USER_PLANS: "/me/planner/plans",
  BUCKETS: "/planner/buckets",
  BUCKET: (bucketId: string) => `/planner/buckets/${bucketId}`,
  BUCKET_TASKS: (bucketId: string) => `/planner/buckets/${bucketId}/tasks`,
  TASKS: "/planner/tasks",
  TASK: (taskId: string) => `/planner/tasks/${taskId}`,
  TASK_DETAILS: (taskId: string) => `/planner/tasks/${taskId}/details`,
  USER_TASKS: "/me/planner/tasks",
  GROUPS: "/groups",
  MEMBER_OF_GROUPS: "/me/memberOf/microsoft.graph.group",
  USERS: "/users",
} as const;
