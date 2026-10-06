export const statusRefSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    status: { type: "string" },
    color: { type: "string" },
    orderindex: { type: "integer" },
    type: { type: "string" },
  },
};
export const userRefSchema = {
  type: "object" as const,
  properties: {
    id: { type: "integer" },
    username: { type: "string" },
    initials: { type: "string" },
    email: { type: "string" },
    color: { type: "string" },
    profilePicture: { type: "string" },
  },
};
export const creatorSchema = {
  type: "object" as const,
  properties: {
    id: { type: "integer" },
    username: { type: "string" },
    color: { type: "string" },
    email: { type: "string" },
    profilePicture: { type: ["string", "null"] },
  },
};
export const taskUserSchema = {
  type: "object" as const,
  properties: {
    id: { type: "integer" },
    username: { type: "string" },
    color: { type: "string" },
    initials: { type: "string" },
    email: { type: "string" },
    profilePicture: { type: ["string", "null"] },
  },
};
export const prioritySchema = {
  type: ["object", "null"] as ("object" | "null")[],
  properties: {
    color: { type: "string" },
    id: { type: "string" },
    orderindex: { type: "string" },
    priority: { type: "string" },
  },
};
export const taskCustomFieldSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    type: { type: "string" },
    type_config: { type: "object" },
    date_created: { type: "string" },
    hide_from_guests: { type: "boolean" },
    value: {},
    value_richtext: { type: "string" },
    value_markdown: { type: "string" },
    required: { type: "boolean" },
  },
};
export const taskTagSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    tag_fg: { type: "string" },
    tag_bg: { type: "string" },
    creator: { type: "integer" },
  },
};
export const taskDependencySchema = {
  type: "object" as const,
  properties: {
    task_id: { type: "string" },
    depends_on: { type: "string" },
    type: { type: "integer" },
    date_created: { type: "string" },
    userid: { type: "string" },
    workspace_id: { type: "string" },
    chain_id: { type: ["string", "null"] },
  },
};
export const taskLocationSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};
export const sharingSchema = {
  type: "object" as const,
  properties: {
    public: { type: "boolean" },
    public_share_expires_on: { type: ["string", "null"] },
    public_fields: { type: "array", items: { type: "string" } },
    token: { type: ["string", "null"] },
    seo_optimized: { type: "boolean" },
  },
};
export const listRefSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    access: { type: "boolean" },
  },
};
export const folderRefSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    hidden: { type: "boolean" },
    access: { type: "boolean" },
  },
};
export const spaceIdRefSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
  },
};
export const requiredFolderRefSchema = {
  ...folderRefSchema,
  required: ["id", "name", "hidden", "access"],
};
export const requiredSpaceRefSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    access: { type: "boolean" },
  },
  required: ["id", "name", "access"],
};
export const folderListItemSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    orderindex: { type: "integer" },
    content: { type: "string" },
    status: {
      properties: {
        status: { type: "string" },
        color: { type: "string" },
        hide_label: { type: "boolean" },
      },
    },
    priority: {
      properties: {
        priority: { type: "string" },
        color: { type: "string" },
      },
    },
    assignee: { type: ["string", "null"] },
    task_count: { type: ["string", "null"] },
    due_date: { type: ["string", "null"] },
    start_date: { type: ["string", "null"] },
    folder: requiredFolderRefSchema,
    space: requiredSpaceRefSchema,
    archived: { type: "boolean" },
    override_statuses: { type: "boolean" },
    permission_level: { type: "string" },
  },
  required: [
    "id",
    "name",
    "orderindex",
    "content",
    "status",
    "priority",
    "assignee",
    "task_count",
    "due_date",
    "start_date",
    "folder",
    "space",
    "archived",
    "override_statuses",
    "permission_level",
  ],
};
export const invitedBySchema = {
  type: "object" as const,
  properties: {
    id: { type: "integer" },
    color: { type: "string" },
    username: { type: "string" },
    email: { type: "string" },
    initials: { type: "string" },
    profilePicture: { type: "string" },
  },
};
const guestUserProperties = {
  id: { type: "integer" },
  username: { type: ["string", "null"] },
  email: { type: "string" },
  color: { type: ["string", "null"] },
  profilePicture: { type: ["string", "null"] },
  initials: { type: "string" },
  role: { type: "integer" },
  last_active: { type: ["string", "null"] },
  date_joined: { type: ["string", "null"] },
  date_invited: { type: "string" },
};
const guestUserRequired = [
  "id",
  "username",
  "email",
  "color",
  "profilePicture",
  "initials",
  "role",
  "last_active",
  "date_joined",
  "date_invited",
];
export const guestUserSchema = {
  type: "object" as const,
  properties: guestUserProperties,
  required: guestUserRequired,
};
export const workspaceMemberUserSchema = {
  type: "object" as const,
  properties: {
    ...guestUserProperties,
    custom_role: {
      type: "object" as const,
      properties: {
        id: { type: "integer" },
        name: { type: "string" },
      },
      required: ["id", "name"],
    },
  },
  required: [...guestUserRequired, "custom_role"],
};
export const roleSchema = {
  type: "object" as const,
  properties: {
    id: { type: "integer" },
    name: { type: "string" },
    custom: { type: "boolean" },
    inherited_role: { type: "integer" },
  },
  required: ["id", "name", "custom"],
};
export const invitedUserMemberSchema = {
  type: "object" as const,
  properties: {
    user: workspaceMemberUserSchema,
    invited_by: invitedBySchema,
  },
  required: ["user", "invited_by"],
};
export const invitedGuestMemberSchema = {
  type: "object" as const,
  properties: {
    user: workspaceMemberUserSchema,
    invited_by: invitedBySchema,
    can_see_time_spent: { type: "boolean" },
    can_see_time_estimated: { type: "boolean" },
    can_edit_tags: { type: "boolean" },
    can_create_views: { type: "boolean" },
    can_see_points_estimated: { type: "boolean" },
  },
  required: [
    "user",
    "invited_by",
    "can_see_time_spent",
    "can_see_time_estimated",
    "can_edit_tags",
    "can_create_views",
  ],
};
export const workspaceTeamUserSchema = {
  type: "object" as const,
  properties: {
    id: { type: "integer" },
    username: { type: "string" },
    email: { type: "string" },
    color: { type: "string" },
    profilePicture: { type: "string" },
    initials: { type: "string" },
    week_start_day: { type: "integer" },
    global_font_support: { type: "boolean" },
    timezeone: { type: "string" },
  },
};
export const memberWithProfileSchema = {
  type: "object" as const,
  properties: {
    id: { type: "integer" },
    username: { type: "string" },
    email: { type: "string" },
    color: { type: ["string", "null"] },
    initials: { type: "string" },
    profilePicture: { type: "string" },
    profileInfo: {
      type: "object" as const,
      properties: {
        display_profile: { type: ["string", "null"] },
        verified_ambassador: { type: ["string", "null"] },
        verified_consultant: { type: ["string", "null"] },
        top_tier_user: { type: ["string", "null"] },
        viewed_verified_ambassador: { type: ["string", "null"] },
        viewed_verified_consultant: { type: ["string", "null"] },
        viewed_top_tier_user: { type: ["string", "null"] },
      },
      required: [
        "display_profile",
        "verified_ambassador",
        "verified_consultant",
        "top_tier_user",
        "viewed_verified_ambassador",
        "viewed_verified_consultant",
        "viewed_top_tier_user",
      ],
    },
  },
  required: [
    "id",
    "username",
    "email",
    "color",
    "initials",
    "profilePicture",
    "profileInfo",
  ],
};
export const sharedTaskSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    status: statusRefSchema,
    orderindex: { type: "string" },
    date_created: { type: "string" },
    date_updated: { type: "string" },
    date_closed: { type: ["string", "null"] },
    archived: { type: "boolean" },
    creator: creatorSchema,
    assignees: { type: "array", items: taskUserSchema },
    checklists: { type: "array", items: { type: "object" } },
    tags: { type: "array", items: taskTagSchema },
    parent: { type: ["string", "null"] },
    priority: prioritySchema,
    due_date: { type: "string" },
    start_date: { type: ["string", "null"] },
    points: { type: ["string", "null"] },
    time_estimate: { type: ["string", "null"] },
    custom_fields: { type: "array", items: taskCustomFieldSchema },
    dependencies: { type: "array", items: taskDependencySchema },
    team_id: { type: "string" },
    url: { type: "string" },
    permission_level: { type: "string" },
    list: { ...listRefSchema, required: ["id", "name", "access"] },
    folder: requiredFolderRefSchema,
    space: spaceIdRefSchema,
  },
  required: [
    "id",
    "name",
    "status",
    "orderindex",
    "date_created",
    "date_updated",
    "date_closed",
    "archived",
    "creator",
    "assignees",
    "checklists",
    "tags",
    "parent",
    "priority",
    "due_date",
    "start_date",
    "points",
    "time_estimate",
    "custom_fields",
    "dependencies",
    "team_id",
    "url",
    "permission_level",
    "list",
    "folder",
    "space",
  ],
};
export const sharedListSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    orderindex: { type: "integer" },
    status: { type: ["string", "null"] },
    priority: { type: ["string", "null"] },
    assignee: { type: ["string", "null"] },
    task_count: { type: "string" },
    due_date: { type: ["string", "null"] },
    start_date: { type: ["string", "null"] },
    archived: { type: "boolean" },
    override_statuses: { type: "boolean" },
    statuses: { type: "array", items: statusRefSchema },
    permission_level: { type: "string" },
  },
  required: [
    "id",
    "name",
    "orderindex",
    "status",
    "priority",
    "assignee",
    "task_count",
    "due_date",
    "start_date",
    "archived",
    "override_statuses",
    "statuses",
    "permission_level",
  ],
};
export const sharedFolderSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    orderindex: { type: "integer" },
    override_statuses: { type: "boolean" },
    hidden: { type: "boolean" },
    task_count: { type: "string" },
    archived: { type: "boolean" },
    statuses: { type: "array", items: statusRefSchema },
    lists: { type: "array", items: { ...sharedListSchema, required: [] } },
    permission_level: { type: "string" },
  },
  required: [
    "id",
    "name",
    "orderindex",
    "override_statuses",
    "hidden",
    "task_count",
    "archived",
    "statuses",
    "lists",
    "permission_level",
  ],
};
export const weakSharedTaskItems = { ...sharedTaskSchema, required: [] };
export const weakSharedListItems = { ...sharedListSchema, required: [] };
export const weakSharedFolderItems = { ...sharedFolderSchema, required: [] };
export const optionalSharedSchema = {
  type: "object" as const,
  properties: {
    tasks: { type: "array", items: weakSharedTaskItems },
    lists: { type: "array", items: weakSharedListItems },
    folders: { type: "array", items: weakSharedFolderItems },
  },
};
export const workspaceTeamProperties = {
  id: { type: "string" },
  name: { type: "string" },
  color: { type: "string" },
  avatar: { type: ["string", "null"] },
};
export const timeEntryTaskSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    status: statusRefSchema,
    custom_type: { type: ["string", "null"] },
  },
  required: ["id", "name", "status", "custom_type"],
};
export const timeEntryTagsSchema = {
  type: "array",
  items: {
    type: "object" as const,
    properties: {
      name: { type: "string" },
      tag_fg: { type: "string" },
      tag_bg: { type: "string" },
    },
  },
};
export const timeEntryRunningSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    task: timeEntryTaskSchema,
    wid: { type: "string" },
    user: userRefSchema,
    billable: { type: "boolean" },
    start: { type: "string" },
    end: { type: "integer" },
    duration: { type: "integer" },
    description: { type: "string" },
    tags: timeEntryTagsSchema,
    source: { type: "string" },
    at: { type: "integer" },
  },
  required: [
    "id",
    "task",
    "wid",
    "user",
    "billable",
    "start",
    "end",
    "duration",
    "description",
    "tags",
    "source",
    "at",
  ],
};
export const userGroupSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    team_id: { type: "string" },
    userid: { type: "integer" },
    name: { type: "string" },
    handle: { type: "string" },
    date_created: { type: "string" },
    initials: { type: "string" },
    members: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          id: { type: "integer" },
          username: { type: "string" },
          email: { type: "string" },
          color: { type: "string" },
          initials: { type: "string" },
          profilePicture: { type: ["string", "null"] },
        },
        required: [
          "id",
          "username",
          "email",
          "color",
          "initials",
          "profilePicture",
        ],
      },
    },
    avatar: {
      type: "object" as const,
      properties: {
        attachment_id: { type: ["string", "null"] },
        color: { type: ["string", "null"] },
        source: { type: ["string", "null"] },
        icon: { type: ["string", "null"] },
      },
      required: ["attachment_id", "color", "source", "icon"],
    },
  },
  required: [
    "id",
    "team_id",
    "userid",
    "name",
    "handle",
    "date_created",
    "initials",
    "members",
    "avatar",
  ],
};
export const webhookSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    userid: { type: "integer" },
    team_id: { type: "integer" },
    endpoint: { type: "string" },
    client_id: { type: "string" },
    events: { type: "array", items: { type: "string" } },
    task_id: { type: ["string", "null"] },
    list_id: { type: ["string", "null"] },
    folder_id: { type: ["string", "null"] },
    space_id: { type: ["string", "null"] },
    health: {
      type: "object" as const,
      properties: {
        status: { type: "string" },
        fail_count: { type: "integer" },
      },
      required: ["status", "fail_count"],
    },
    secret: { type: "string" },
  },
  required: [
    "id",
    "userid",
    "team_id",
    "endpoint",
    "client_id",
    "events",
    "task_id",
    "list_id",
    "folder_id",
    "space_id",
    "health",
    "secret",
  ],
};
