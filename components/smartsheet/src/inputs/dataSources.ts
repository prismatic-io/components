import { connectionInput, sheetId } from "./common";

export const selectAttachmentInputs = {
  connection: connectionInput,
  sheetId: { ...sheetId, dataSource: undefined },
};

export const selectColumnInputs = {
  connection: connectionInput,
  sheetId: { ...sheetId, dataSource: undefined },
};

export const selectWebhookScopeColumnInputs = {
  connection: connectionInput,
  scopeObjectId: {
    ...sheetId,
    label: "Scope Object ID",
    dataSource: undefined,
  },
};

export const selectContactInputs = {
  connection: connectionInput,
};

export const selectDiscussionInputs = {
  connection: connectionInput,
  sheetId: { ...sheetId, dataSource: undefined },
};

export const selectFolderInputs = {
  connection: connectionInput,
};

export const selectGroupInputs = {
  connection: connectionInput,
};

export const selectReportInputs = {
  connection: connectionInput,
};

export const selectRowInputs = {
  connection: connectionInput,
  sheetId: { ...sheetId, dataSource: undefined },
};

export const selectSheetInputs = {
  connection: connectionInput,
};

export const selectUserInputs = {
  connection: connectionInput,
};

export const selectWebhookInputs = {
  connection: connectionInput,
};

export const selectWorkspaceInputs = {
  connection: connectionInput,
};
