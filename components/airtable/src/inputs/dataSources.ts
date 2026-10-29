import { input, util } from "@prismatic-io/spectral";
import { baseIdInput, connectionInput, tableName } from "./common";

const includeIdInput = input({
  label: "Include ID in Dropdown",
  type: "boolean",
  required: false,
  default: "false",
  clean: util.types.toBool,
  comments:
    "When true, the base or table ID is shown next to each dropdown menu option.",
});

export const selectBaseInputs = {
  airtableConnection: connectionInput,
  includeId: includeIdInput,
};

export const selectTableInputs = {
  airtableConnection: connectionInput,
  baseId: {
    ...baseIdInput,
    required: true,
    dataSource: undefined,
  },
  includeId: includeIdInput,
};

export const selectRecordInputs = {
  airtableConnection: connectionInput,
  baseId: {
    ...baseIdInput,
    dataSource: undefined,
  },
  tableName: {
    ...tableName,
    dataSource: undefined,
  },
  includeId: includeIdInput,
};

export const selectWebhookInputs = {
  airtableConnection: connectionInput,
  baseId: {
    ...baseIdInput,
    dataSource: undefined,
  },
  includeId: includeIdInput,
};
