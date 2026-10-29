import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanCategoryLabels, cleanStringList } from "../utils";
import {
  connectionInput,
  etagInput,
  groupIdInput,
  planIdInput,
} from "./common";
const planTitleInput = input({
  label: "Title",
  type: "string",
  required: true,
  example: "Q3 Marketing Launch",
  placeholder: "Enter a plan title",
  comments: "The title of the plan, shown wherever the plan is listed.",
  clean: util.types.toString,
});
const containerGroupIdInput = input({
  ...groupIdInput,
  required: true,
  placeholder: "Enter a group ID",
  comments:
    "The Microsoft 365 group that holds the plan. Only Microsoft 365 groups can contain Planner plans.",
  clean: util.types.toString,
});
const categoryLabelsInput = input({
  label: "Category Labels",
  type: "string",
  required: false,
  collection: "keyvaluelist",
  example: '{"category1": "Blocked"}',
  placeholder: "Enter a category key and its label",
  comments:
    "Labels for the plan's colored categories, keyed by category1 through category25. Only the categories listed here change; leave a category out to keep its current label.",
  clean: cleanCategoryLabels,
});
const shareWithInput = input({
  label: "Share With",
  type: "string",
  required: false,
  collection: "valuelist",
  dataSource: "selectUser",
  example: '["48d31887-5fad-4d73-a9f5-3c356e68a038"]',
  placeholder: "Select users to share with",
  comments:
    "Users to add to the plan's shared-with list, identified by object ID. For a plan contained by a Microsoft 365 group, managing group membership is usually preferable to sharing individually.",
  clean: cleanStringList,
});
const unshareWithInput = input({
  label: "Unshare With",
  type: "string",
  required: false,
  collection: "valuelist",
  dataSource: "selectUser",
  example: '["48d31887-5fad-4d73-a9f5-3c356e68a038"]',
  placeholder: "Select users to remove",
  comments:
    "Users to remove from the plan's shared-with list, identified by object ID.",
  clean: cleanStringList,
});
const planSharingInput = structuredObjectInput({
  label: "Sharing",
  required: false,
  comments: "Users to add to or remove from the shared-with list.",
  inputs: {
    shareWith: shareWithInput,
    unshareWith: unshareWithInput,
  },
});
const planDetailsEtagInput = input({
  ...etagInput,
  label: "Plan Details ETag",
  example: 'W/"JzEtUGxhbkRldGFpbHMgQEBAQEBAQEBAQEBAQEBARCc="',
  placeholder: "Enter a plan details ETag",
  comments:
    "The last known ETag of the plan details. Plan details carry their own ETag, separate from the plan's, so a plan ETag cannot be used here. Leave blank to read the current value before writing.",
});
export const createPlanInputs = {
  connection: connectionInput,
  groupId: containerGroupIdInput,
  title: planTitleInput,
};
export const deletePlanInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  etag: etagInput,
};
export const getPlanInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
};
export const getPlanDetailsInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
};
export const listPlansForUserInputs = {
  connection: connectionInput,
};
export const listPlansInGroupInputs = {
  connection: connectionInput,
  groupId: containerGroupIdInput,
};
export const updatePlanInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  title: planTitleInput,
  etag: etagInput,
};
export const updatePlanDetailsInputs = {
  connection: connectionInput,
  groupId: groupIdInput,
  planId: planIdInput,
  categoryDescriptions: categoryLabelsInput,
  sharing: planSharingInput,
  etag: planDetailsEtagInput,
};
