import {
  statusRefSchema,
  timeEntryRunningSchema,
  timeEntryTagsSchema,
  timeEntryTaskSchema,
  userRefSchema,
} from "./shared";
const timeEntryApprovalUserSchema = {
  type: "object" as const,
  properties: {
    id: { type: "integer" },
    username: { type: "string" },
    email: { type: "string" },
    color: { type: "string" },
    initials: { type: "string" },
    profilePicture: { type: ["string", "null"] },
  },
  required: ["id", "username", "email", "color", "initials", "profilePicture"],
};
const timeEntryDetailProperties = {
  id: { type: "string" },
  wid: { type: "string" },
  user: userRefSchema,
  billable: { type: "boolean" },
  start: { type: "string" },
  end: { type: "string" },
  duration: { type: "string" },
  description: { type: "string" },
  tags: timeEntryTagsSchema,
  source: { type: "string" },
  at: { type: "string" },
  approval_id: { type: "string" },
  approval: {
    type: "object" as const,
    properties: {
      id: { type: "string" },
      workspace_id: { type: "integer" },
      status: { type: "string" },
      data: {
        type: "object" as const,
        properties: {
          end_of_week: { type: "integer" },
          start_of_week: { type: "integer" },
        },
      },
      user: timeEntryApprovalUserSchema,
      approvers: {
        type: "array",
        items: {
          type: "object" as const,
          properties: { id: { type: "integer" } },
        },
      },
      approver_id: { type: "integer" },
      approved_at: { type: "integer" },
      history: {
        type: "array",
        items: {
          type: "object" as const,
          properties: {
            id: { type: "string" },
            field: { type: "string" },
            before: { type: "string" },
            after: { type: "string" },
            created_at: { type: "integer" },
            user: timeEntryApprovalUserSchema,
          },
        },
      },
    },
  },
  task_location: {
    type: "object" as const,
    properties: {
      list_id: { type: "integer" },
      folder_id: { type: "integer" },
      space_id: { type: "integer" },
      list_name: { type: "string" },
      folder_name: { type: "string" },
      space_name: { type: "string" },
    },
  },
  task_tags: {
    type: "array",
    items: {
      type: "object" as const,
      properties: {
        name: { type: "string" },
        tag_fg: { type: "string" },
        tag_bg: { type: "string" },
        creator: { type: "integer" },
      },
      required: ["name", "tag_fg", "tag_bg", "creator"],
    },
  },
  task_url: { type: "string" },
};
const timeEntryDetailRequired = [
  "id",
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
];
export const getSingularTimeEntryOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: timeEntryDetailProperties,
      required: timeEntryDetailRequired,
    },
  },
  required: ["data"],
};
export const getTimeEntriesWithinDateRangeOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          ...timeEntryDetailProperties,
          task: {
            type: "object" as const,
            properties: {
              id: { type: "string" },
              custom_id: { type: "string" },
              name: { type: "string" },
              status: statusRefSchema,
              custom_type: { type: ["string", "null"] },
            },
            required: ["id", "name", "status", "custom_type"],
          },
        },
        required: timeEntryDetailRequired,
      },
    },
  },
  required: ["data"],
};
export const startTimeEntryOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        id: { type: "string" },
        task: timeEntryTaskSchema,
        wid: { type: "string" },
        user: userRefSchema,
        billable: { type: "boolean" },
        start: { type: "string" },
        duration: { type: "integer" },
        description: { type: "string" },
        tags: timeEntryTagsSchema,
        at: { type: "integer" },
      },
      required: [
        "id",
        "task",
        "wid",
        "user",
        "billable",
        "start",
        "duration",
        "description",
        "tags",
        "at",
      ],
    },
  },
  required: ["data"],
};
export const stopTimeEntryOutputSchema = {
  type: "object" as const,
  properties: { data: timeEntryRunningSchema },
  required: ["data"],
};
export const deleteTimeEntryOutputSchema = stopTimeEntryOutputSchema;
