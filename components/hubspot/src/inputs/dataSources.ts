import { input, util } from "@prismatic-io/spectral";
import { connectionInput, objectType, objectsToSelect } from "./common";
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
const includeCustomObjects = input({
  label: "Include Custom Objects",
  type: "boolean",
  default: "false",
  clean: util.types.toBool,
});
export const getObjectSelectionInputs = {
  connection: connectionInput,
  objectsToSelect,
  includeCustomObjects,
};
