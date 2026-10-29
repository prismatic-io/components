import { apiVersion, connectionInput, workbookId } from "./common";

export const selectConnectionInputs = {
  tableauConnection: connectionInput,
  workbookId: {
    ...workbookId,
    dataSource: undefined,
  },
};

export const selectProjectInputs = {
  tableauConnection: connectionInput,
};

export const selectUserInputs = {
  tableauConnection: connectionInput,
};

export const selectWebhookInputs = {
  tableauConnection: connectionInput,
  apiVersion,
};

export const selectWorkbookInputs = {
  tableauConnection: connectionInput,
};
