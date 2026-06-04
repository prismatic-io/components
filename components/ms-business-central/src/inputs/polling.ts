import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput, pollResourceModel } from "../utils";
import { companyId } from "./accounts/getAccountsInputs";
import { connectionInput } from "./general";

const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  model: pollResourceModel,
  comments: "The Business Central entity to poll for changes.",
  clean: util.types.toString,
});

const additionalFilter = input({
  label: "Additional Filter",
  type: "string",
  required: false,
  placeholder: "Enter optional OData filter",
  example: "type eq 'Inventory'",
  comments:
    "Optional OData filter to combine (AND) with the modification-time filter applied by the trigger.",
  clean: cleanStringInput,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When enabled, records modified after the last poll are included in the trigger output.",
  clean: util.types.toBool,
});





export const pollChangesInputs = {
  connection: connectionInput,
  companyId,
  pollResourceType,
  additionalFilter,
  showUpdatedRecords,
};
