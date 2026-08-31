import {
  connectionInput,
  fileIdInput,
  folderIdInput,
  signatureKey,
  targetId,
  targetType,
  triggerTypes,
} from "./common";
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
};
export const newFolderInputs = {
  connection: connectionInput,
  folderId: folderIdInput,
};
export const newFileCommentsInputs = {
  connection: connectionInput,
  fileId: fileIdInput,
};
