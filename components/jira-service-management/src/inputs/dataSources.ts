import { input, util } from "@prismatic-io/spectral";
import { connection, issueIdOrKey, serviceDeskId } from "./common";

const serviceDeskIdNoDs = { ...serviceDeskId, dataSource: undefined };
const issueIdOrKeyNoDs = { ...issueIdOrKey, dataSource: undefined };



const assetSchemaIdNoDs = input({
  label: "Schema ID",
  type: "string",
  required: true,
  comments:
    "ID of the Assets object schema whose object types should be listed.",
  placeholder: "Enter schema ID",
  example: "1",
  clean: util.types.toString,
});

export const selectServiceDeskInputs = {
  connection,
};

export const selectRequestTypeInputs = {
  connection,
  serviceDeskId: serviceDeskIdNoDs,
};

export const selectQueueInputs = {
  connection,
  serviceDeskId: serviceDeskIdNoDs,
};

export const selectRequestInputs = {
  connection,
  serviceDeskId: serviceDeskIdNoDs,
};

export const selectOrganizationInputs = {
  connection,
};

export const selectTransitionInputs = {
  connection,
  issueIdOrKey: issueIdOrKeyNoDs,
};

export const selectApprovalInputs = {
  connection,
  issueIdOrKey: issueIdOrKeyNoDs,
};

export const selectAssetSchemaInputs = {
  connection,
};

export const selectAssetObjectTypeInputs = {
  connection,
  assetSchemaId: assetSchemaIdNoDs,
};

export const selectOpsScheduleInputs = {
  connection,
};
