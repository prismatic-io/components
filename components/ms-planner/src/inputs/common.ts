import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../utils";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Microsoft Planner connection to use.",
});
export const etagInput = input({
  label: "ETag",
  type: "string",
  required: false,
  example: 'W/"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBAWCc="',
  placeholder: "Enter an ETag",
  comments:
    "The last known ETag of the resource being changed. Leave blank to let the action read the current ETag before writing. Supply a value to make the change conditional on that exact version, which fails with a conflict if the resource changed.",
  clean: cleanStringInput,
});
export const groupIdInput = input({
  label: "Group ID",
  type: "string",
  required: false,
  dataSource: "selectGroup",
  example: "ebf3b108-5234-4e22-b93d-656d7dae5874",
  placeholder: "Enter a group ID",
  comments:
    "The Microsoft 365 group whose plans populate the Plan ID dropdown. Only Microsoft 365 groups can hold Planner plans. Leave blank to list the plans shared with the connection's user instead.",
  clean: cleanStringInput,
});
export const planIdInput = input({
  label: "Plan ID",
  type: "string",
  required: true,
  dataSource: "selectPlan",
  example: "xqQg5FS2LkCp935s-FIFm2QAFkHM",
  placeholder: "Enter a plan ID",
  comments: "The unique identifier of the plan.",
  clean: util.types.toString,
});
export const bucketIdInput = input({
  label: "Bucket ID",
  type: "string",
  required: true,
  dataSource: "selectBucket",
  example: "hsOf2dhOJkqyYYZEtdzDe2QAIUCR",
  placeholder: "Enter a bucket ID",
  comments: "The unique identifier of the bucket.",
  clean: util.types.toString,
});
export const bucketIdOptionalInput = input({
  ...bucketIdInput,
  required: false,
  comments:
    "The unique identifier of the bucket. Leave blank to leave the task in its current bucket.",
  clean: cleanStringInput,
});
export const taskIdInput = input({
  label: "Task ID",
  type: "string",
  required: true,
  dataSource: "selectTask",
  example: "01gzSlKkIUSUl6DF_EilrmQAKDhh",
  placeholder: "Enter a task ID",
  comments: "The unique identifier of the task.",
  clean: util.types.toString,
});
