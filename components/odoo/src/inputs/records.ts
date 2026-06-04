import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connection, fetchAll, limit, model, offset } from "./common";

const recordId = input({
  label: "Record ID",
  comments: "The numeric identifier of the target record assigned by Odoo.",
  example: "25",
  placeholder: "Enter a record ID",
  type: "string",
  required: true,
  dataSource: "selectRecordById",
  clean: util.types.toNumber,
});


const parameters = input({
  label: "Parameters",
  type: "code",
  language: "json",
  required: true,
  clean: util.types.toObject,
  comments:
    "The field names and values to set on the record. Must be a JSON object keyed by Odoo field name.",
  example: JSON.stringify(
    {
      name: "John Doe",
      email: "doe@example.com",
      country_code: "US",
      city: "New York",
      zip: "10001",
    },
    null,
    2,
  ),
});

const externalId = input({
  label: "External ID",
  comments:
    "A unique identifier that maps this record to its counterpart in an external system. Use the 'module.name' format.",
  type: "string",
  required: false,
  example: "custom_partner.abc_123",
  placeholder: "Enter an external ID (module.name)",
  clean: toOptionalString,
});

export const listRecordsInputs = {
  connection,
  model,
  fetchAll,
  limit,
  offset,
};

export const getRecordByIdInputs = {
  connection,
  model,
  id: recordId,
};

export const getRecordByExternalIdInputs = {
  connection,
  externalId: { ...externalId, required: true },
};

export const deleteRecordByIdInputs = {
  connection,
  model,
  id: recordId,
};

export const createRecordInputs = {
  connection,
  model,
  parameters,
  externalId,
};

export const updateRecordInputs = {
  connection,
  model,
  id: recordId,
  parameters,
};

export const setExternalIdInputs = {
  connection,
  model,
  id: recordId,
  externalId: { ...externalId, required: true },
};
