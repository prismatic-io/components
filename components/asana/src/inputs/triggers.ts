import { input, util } from "@prismatic-io/spectral";
import { connectionInput, projectId, workspaceId } from "./common";
const triggerWhenAdded = input({
  label: "Trigger When Added",
  type: "boolean",
  default: "true",
  comments: "When true, the webhook triggers when a new resource is added.",
  required: true,
  clean: util.types.toBool,
});
const triggerWhenRemoved = input({
  label: "Trigger When Removed",
  type: "boolean",
  default: "true",
  comments: "When true, the webhook triggers when a resource is removed.",
  required: true,
  clean: util.types.toBool,
});
const triggerWhenChanged = input({
  label: "Trigger When Changed",
  type: "boolean",
  default: "true",
  comments: "When true, the webhook triggers when a resource is changed.",
  required: true,
  clean: util.types.toBool,
});
const triggerWhenDeleted = input({
  label: "Trigger When Deleted",
  type: "boolean",
  default: "true",
  comments: "When true, the webhook triggers when a resource is deleted.",
  required: true,
  clean: util.types.toBool,
});
const triggerWhenUndeleted = input({
  label: "Trigger When Undeleted",
  type: "boolean",
  default: "true",
  comments: "When true, the webhook triggers when a resource is undeleted.",
  required: true,
  clean: util.types.toBool,
});
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
  comments:
    "When true, tasks created since the last poll are returned in the trigger payload.",
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  clean: util.types.toBool,
  comments:
    "When true, tasks modified since the last poll are returned in the trigger payload.",
});
export const pollChangesTriggerInputs = {
  asanaConnection: connectionInput,
  projectId,
  showNewRecords,
  showUpdatedRecords,
};
export const workspaceProjectsTriggerInputs = {
  asanaConnection: connectionInput,
  workspaceId,
  triggerWhenAdded: {
    ...triggerWhenAdded,
    comments: "Determines if the webhook will trigger when a project is added.",
  },
  triggerWhenChanged: {
    ...triggerWhenChanged,
    comments:
      "Determines if the webhook will trigger when a project is changed.",
  },
  triggerWhenDeleted: {
    ...triggerWhenDeleted,
    comments:
      "Determines if the webhook will trigger when a project is deleted.",
  },
  triggerWhenRemoved: {
    ...triggerWhenRemoved,
    comments:
      "Determines if the webhook will trigger when a project is removed.",
  },
  triggerWhenUndeleted: {
    ...triggerWhenUndeleted,
    comments:
      "Determines if the webhook will trigger when a project is undeleted.",
  },
};
export const projectTasksTriggerInputs = {
  asanaConnection: connectionInput,
  projectId,
  triggerWhenAdded: {
    ...triggerWhenAdded,
    comments: "Determines if the webhook will trigger when a task is added.",
  },
  triggerWhenChanged: {
    ...triggerWhenChanged,
    comments: "Determines if the webhook will trigger when a task is changed.",
  },
  triggerWhenDeleted: {
    ...triggerWhenDeleted,
    comments: "Determines if the webhook will trigger when a task is deleted.",
  },
  triggerWhenRemoved: {
    ...triggerWhenRemoved,
    comments: "Determines if the webhook will trigger when a task is removed.",
  },
  triggerWhenUndeleted: {
    ...triggerWhenUndeleted,
    comments:
      "Determines if the webhook will trigger when a task is undeleted.",
  },
};
export const storiesTriggerInputs = {
  asanaConnection: connectionInput,
  projectId,
  triggerWhenAdded: {
    ...triggerWhenAdded,
    comments:
      "Determines if the webhook will trigger when a comment or activity is added.",
  },
  triggerWhenChanged: {
    ...triggerWhenChanged,
    comments:
      "Determines if the webhook will trigger when a comment or activity is changed.",
  },
  triggerWhenDeleted: {
    ...triggerWhenDeleted,
    comments:
      "Determines if the webhook will trigger when a comment or activity is deleted.",
  },
  triggerWhenRemoved: {
    ...triggerWhenRemoved,
    comments:
      "Determines if the webhook will trigger when a comment or activity is removed.",
  },
  triggerWhenUndeleted: {
    ...triggerWhenUndeleted,
    comments:
      "Determines if the webhook will trigger when a comment or activity is undeleted.",
  },
};
