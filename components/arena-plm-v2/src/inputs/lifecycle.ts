import { input, util } from "@prismatic-io/spectral";
import { toOptionalObject, toOptionalString } from "../util";
import { changeGuidInput, connectionInput } from "./common";
const changeLifecycleStatusInput = input({
  label: "Target Status",
  type: "string",
  required: true,
  placeholder: "Select target status",
  comments: "The target lifecycle status to move the change to.",
  example: "APPROVED",
  model: [
    { label: "Open", value: "OPEN" },
    { label: "Submitted for Approval", value: "SUBMITTED_FOR_APPROVAL" },
    { label: "Submitted", value: "SUBMITTED" },
    { label: "Approved", value: "APPROVED" },
    { label: "Effective", value: "EFFECTIVE" },
    { label: "Expired", value: "EXPIRED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Open and Unlocked", value: "OPEN_AND_UNLOCKED" },
    { label: "Open and Locked", value: "OPEN_AND_LOCKED" },
    { label: "Submitted for Routing", value: "SUBMITTED_FOR_ROUTING" },
    { label: "Canceled", value: "CANCELED" },
    { label: "Completed", value: "COMPLETED" },
  ],
  clean: util.types.toString,
});
const changeLifecycleFromStatusInput = input({
  label: "From Status",
  type: "string",
  required: false,
  placeholder: "Select current status (optional)",
  comments: "The current lifecycle status of the change (for validation).",
  example: "OPEN",
  model: [
    { label: "Open", value: "OPEN" },
    { label: "Submitted for Approval", value: "SUBMITTED_FOR_APPROVAL" },
    { label: "Submitted", value: "SUBMITTED" },
    { label: "Approved", value: "APPROVED" },
    { label: "Effective", value: "EFFECTIVE" },
    { label: "Expired", value: "EXPIRED" },
    { label: "Rejected", value: "REJECTED" },
    { label: "Open and Unlocked", value: "OPEN_AND_UNLOCKED" },
    { label: "Open and Locked", value: "OPEN_AND_LOCKED" },
    { label: "Submitted for Routing", value: "SUBMITTED_FOR_ROUTING" },
    { label: "Canceled", value: "CANCELED" },
    { label: "Completed", value: "COMPLETED" },
  ],
  clean: toOptionalString,
});
const changeLifecycleCommentInput = input({
  label: "Comment",
  type: "text",
  required: false,
  placeholder: "Enter optional comment",
  comments: "Optional comment for the lifecycle status change.",
  example: "Approved by engineering team after review",
  clean: toOptionalString,
});
const changeLifecycleAdministratorsInput = input({
  label: "Administrators",
  type: "data",
  required: false,
  placeholder: "Enter administrator GUIDs",
  comments: "Array of user GUIDs to assign as administrators.",
  example: '[{"guid": "abc123-def456-ghi789"}]',
  clean: toOptionalObject,
});
const changeAdminNeedConfigInput = input({
  label: "Administrator Configuration Needed",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, administrator configuration is needed for this transition.",
  clean: util.types.toBool,
});
const changeLifecycleImplementationStatusInput = input({
  label: "Implementation Status",
  type: "data",
  required: false,
  placeholder: "Enter implementation status",
  comments: "Implementation status object with guid and value properties.",
  example: '{"guid": "status-guid", "value": "IN_PROGRESS"}',
  clean: toOptionalObject,
});
export const changeLifecycleStatusInputs = {
  connection: connectionInput,
  changeGuid: changeGuidInput,
  status: changeLifecycleStatusInput,
  fromStatus: changeLifecycleFromStatusInput,
  comment: changeLifecycleCommentInput,
  administrators: changeLifecycleAdministratorsInput,
  adminNeedConfig: changeAdminNeedConfigInput,
  implementationStatus: changeLifecycleImplementationStatusInput,
};
