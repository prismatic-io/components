import { baseIdInput, connectionInput } from "./common";

export const listBasesInputs = {
  airtableConnection: connectionInput,
};

export const getBaseSchemaInputs = {
  airtableConnection: connectionInput,
  baseId: baseIdInput,
};
