import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import {
  cleanChecklistItems,
  cleanOptionalNumber,
  cleanReferences,
  cleanStringInput,
  cleanStringList,
} from "../utils";
import {
  bucketIdInput,
  bucketIdOptionalInput,
  connectionInput,
  etagInput,
  groupIdInput,
  planIdInput,
  taskIdInput,
} from "./common";
const categoryModel = Array.from({ length: 25 }, (_, index) => ({
  label: `Category ${index + 1}`,
  value: `category${index + 1}`,
}));
const taskTitleInput = input({
  label: "Title",
  type: "string",
  required: true,
  example: "Update the client list",
  placeholder: "Enter a task title",
  comments: "The title of the task, shown on its card in the Planner board.",
  clean: util.types.toString,
});
const taskTitleOptionalInput = input({
  ...taskTitleInput,
  required: false,
  placeholder: "Enter a new task title",
  comments: "A new title for the task. Leave blank to keep the current title.",
  clean: cleanStringInput,
});
const startDateTimeInput = input({
  label: "Start At",
  type: "string",
  required: false,
  example: "2024-01-15T12:00:00Z",
  placeholder: "Enter a start timestamp (ISO 8601)",
  comments: "The timestamp the task starts, in ISO 8601 format.",
  clean: cleanStringInput,
});
const dueDateTimeInput = input({
  label: "Due At",
  type: "string",
  required: false,
  example: "2024-01-22T12:00:00Z",
  placeholder: "Enter a due timestamp (ISO 8601)",
  comments: "The timestamp the task is due, in ISO 8601 format.",
  clean: cleanStringInput,
});
const taskScheduleInput = structuredObjectInput({
  label: "Schedule",
  required: false,
  comments: "Start and due timestamps.",
  inputs: {
    startDateTime: startDateTimeInput,
    dueDateTime: dueDateTimeInput,
  },
});
const percentCompleteInput = input({
  label: "Percent Complete",
  type: "string",
  required: false,
  example: "50",
  placeholder: "Enter a value from 0 to 100",
  comments:
    "How complete the task is, from 0 to 100. Planner has no separate completed flag: setting this to 100 completes the task, and the service fills in who completed it and when.",
  clean: cleanOptionalNumber,
});
const priorityInput = input({
  label: "Priority",
  type: "string",
  required: false,
  example: "5",
  placeholder: "Select a priority",
  model: [
    { label: "Urgent", value: "1" },
    { label: "Important", value: "3" },
    { label: "Medium", value: "5" },
    { label: "Low", value: "9" },
  ],
  comments:
    "The priority of the task. Planner stores priority as a number from 0 to 10 and displays it in four bands, so these four values are the ones the Planner interface itself uses.",
  clean: cleanOptionalNumber,
});
const applyCategoriesInput = input({
  label: "Apply",
  type: "string",
  required: false,
  collection: "valuelist",
  model: categoryModel,
  placeholder: "Select categories to apply",
  comments:
    "Colored categories to apply to the task. The label shown for each category is configured on the plan.",
  clean: cleanStringList,
});
const removeCategoriesInput = input({
  label: "Remove",
  type: "string",
  required: false,
  collection: "valuelist",
  model: categoryModel,
  placeholder: "Select categories to remove",
  comments: "Colored categories to remove from the task.",
  clean: cleanStringList,
});
const taskCategoriesInput = structuredObjectInput({
  label: "Categories",
  required: false,
  comments: "Colored categories to apply or remove.",
  inputs: {
    applyCategories: applyCategoriesInput,
    removeCategories: removeCategoriesInput,
  },
});
const assignToInput = input({
  label: "Assign To",
  type: "string",
  required: false,
  collection: "valuelist",
  dataSource: "selectUser",
  example: '["48d31887-5fad-4d73-a9f5-3c356e68a038"]',
  placeholder: "Select users to assign",
  comments:
    "Users to assign to the task, identified by object ID. Existing assignees that are not listed here are left in place.",
  clean: cleanStringList,
});
const unassignInput = input({
  label: "Unassign",
  type: "string",
  required: false,
  collection: "valuelist",
  dataSource: "selectUser",
  example: '["48d31887-5fad-4d73-a9f5-3c356e68a038"]',
  placeholder: "Select users to unassign",
  comments: "Users to remove from the task, identified by object ID.",
  clean: cleanStringList,
});
const taskAssignmentInput = structuredObjectInput({
  label: "Assignment",
  required: false,
  comments: "Users to assign or unassign.",
  inputs: {
    assignTo: assignToInput,
    unassign: unassignInput,
  },
});
const conversationThreadIdInput = input({
  label: "Conversation Thread ID",
  type: "string",
  required: false,
  example: "AAQkADMxYWM1NzYzLWEwZTYtNDI0NC1hMTIzLTk4NzY1NDMyMTBhYg==",
  placeholder: "Enter a conversation thread ID",
  comments:
    "The identifier of the group conversation thread associated with the task.",
  clean: cleanStringInput,
});
const descriptionInput = input({
  label: "Description",
  type: "text",
  required: false,
  example: "Confirm every contact before the launch.",
  placeholder: "Enter a task description",
  comments:
    "The description of the task. Descriptions live on the task's details resource rather than the task itself, so setting one is a separate write.",
  clean: cleanStringInput,
});
const previewTypeInput = input({
  label: "Preview Type",
  type: "string",
  required: false,
  example: "description",
  placeholder: "Select a preview type",
  model: [
    { label: "Automatic", value: "automatic" },
    { label: "No Preview", value: "noPreview" },
    { label: "Checklist", value: "checklist" },
    { label: "Description", value: "description" },
    { label: "Reference", value: "reference" },
  ],
  comments:
    "Which part of the task details is shown on the task's card in the Planner board.",
  clean: cleanStringInput,
});
const addChecklistItemsInput = input({
  label: "Add Items",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  example: '{"Confirm the mailing address": "false"}',
  placeholder: "Enter an item title and true or false",
  comments:
    "Checklist items to add, where the key is the item title and the value is true if the item starts checked.",
  clean: cleanChecklistItems,
});
const removeChecklistItemIdsInput = input({
  label: "Remove Items",
  type: "string",
  required: false,
  collection: "valuelist",
  example: '["95e27074-6c4a-447a-aa24-9d718a0b86fa"]',
  placeholder: "Enter a checklist item ID",
  comments:
    "Identifiers of checklist items to remove. Use the Get Task Details action to read the current item identifiers.",
  clean: cleanStringList,
});
const checklistInput = structuredObjectInput({
  label: "Checklist",
  required: false,
  comments: "Checklist items to add or remove.",
  inputs: {
    addItems: addChecklistItemsInput,
    removeItemIds: removeChecklistItemIdsInput,
  },
});
const addReferencesInput = input({
  label: "Add",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  example: '{"https://example.com/spec": "Specification"}',
  placeholder: "Enter a URL and a display name",
  comments:
    "External links to attach to the task, where the key is the URL and the value is the display name shown in Planner.",
  clean: cleanReferences,
});
const removeReferenceUrlsInput = input({
  label: "Remove",
  type: "string",
  required: false,
  collection: "valuelist",
  example: '["https://example.com/spec"]',
  placeholder: "Enter a URL to remove",
  comments: "URLs of external links to remove from the task.",
  clean: cleanStringList,
});
const referencesInput = structuredObjectInput({
  label: "Links",
  required: false,
  comments: "External links to attach or remove.",
  inputs: {
    addReferences: addReferencesInput,
    removeReferenceUrls: removeReferenceUrlsInput,
  },
});
const taskDetailsEtagInput = input({
  ...etagInput,
  label: "Task Details ETag",
  example: 'W/"JzEtVGFza0RldGFpbHMgQEBAQEBAQEBAQEBAQEBARCc="',
  placeholder: "Enter a task details ETag",
  comments:
    "The last known ETag of the task details. Task details carry their own ETag, separate from the task's, so a task ETag cannot be used here. Leave blank to read the current value before writing.",
});
export const assignTaskInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  taskId: taskIdInput,
  assignment: {
    ...taskAssignmentInput,
    comments:
      "Users to assign or unassign. At least one of Assign To or Unassign is required.",
  },
  etag: etagInput,
};
export const completeTaskInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  taskId: taskIdInput,
  etag: etagInput,
};
export const createTaskInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  title: taskTitleInput,
  bucketId: {
    ...bucketIdOptionalInput,
    comments:
      "The unique identifier of the bucket to create the task in. Leave blank to create the task without assigning it to a bucket.",
  },
  assignment: taskAssignmentInput,
  schedule: taskScheduleInput,
  priority: priorityInput,
  percentComplete: percentCompleteInput,
  categories: taskCategoriesInput,
  description: descriptionInput,
};
export const deleteTaskInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  taskId: taskIdInput,
  etag: etagInput,
};
export const getTaskInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  taskId: taskIdInput,
};
export const getTaskDetailsInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  taskId: taskIdInput,
};
export const listTasksForUserInputs = {
  connection: connectionInput,
};
export const listTasksInBucketInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  bucketId: bucketIdInput,
};
export const listTasksInPlanInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
};
export const moveTaskToBucketInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  taskId: taskIdInput,
  bucketId: bucketIdInput,
  etag: etagInput,
};
export const updateTaskInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  taskId: taskIdInput,
  title: taskTitleOptionalInput,
  bucketId: bucketIdOptionalInput,
  assignment: taskAssignmentInput,
  schedule: taskScheduleInput,
  priority: priorityInput,
  percentComplete: percentCompleteInput,
  categories: taskCategoriesInput,
  conversationThreadId: conversationThreadIdInput,
  etag: etagInput,
};
export const updateTaskDetailsInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  taskId: taskIdInput,
  description: descriptionInput,
  checklist: checklistInput,
  references: referencesInput,
  previewType: previewTypeInput,
  etag: taskDetailsEtagInput,
};
