import { connectionInput, objectType } from "./common";

export const selectCompanyInputs = {
  connection: connectionInput,
};

export const selectContactInputs = selectCompanyInputs;

export const selectDealInputs = selectCompanyInputs;

export const selectEngagementInputs = selectCompanyInputs;

export const selectLineItemInputs = selectCompanyInputs;

export const selectProductInputs = selectCompanyInputs;

export const selectWebhookInputs = selectCompanyInputs;

export const selectImportInputs = selectCompanyInputs;

export const selectCustomObjectInputs = selectCompanyInputs;

export const selectPropertyInputs = {
  ...selectCompanyInputs,
  objectType: {
    ...objectType,
    dataSource: undefined,
  },
};
