import { input } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../util";
import {
  connectionInput,
  fileIdInput,
  folderIdInput,
  signatureKey,
  targetId,
  targetType,
  triggerTypes,
} from "./common";
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
export const webhookInputs = {
  primarySignatureKey: { ...signatureKey, label: "Primary Signature Key" },
  secondarySignatureKey: {
    ...signatureKey,
    label: "Secondary Signature Key",
  },
};
export const managedWebhookInputs = {
  connection: connectionInput,
  targetId,
  targetType,
  triggerTypes,
  primarySignatureKey: { ...signatureKey, label: "Primary Signature Key" },
  secondarySignatureKey: {
    ...signatureKey,
    label: "Secondary Signature Key",
  },
};
export const newOrUpdatedFileInputs = {
  connection: connectionInput,
  folderId: folderIdInput,
  lookBackDate,
};
export const newFolderInputs = {
  connection: connectionInput,
  folderId: folderIdInput,
  lookBackDate,
};
export const newFileCommentsInputs = {
  connection: connectionInput,
  fileId: fileIdInput,
  lookBackDate,
};
