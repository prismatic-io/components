import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "./util";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "An OAuth 2.0 password grant type connection",
});





const retailerId = input({
  label: "Retailer ID",
  type: "string",
  required: false,
  example: "34",
  comments:
    "Optional Fluent retailer ID to scope the polling query. When omitted, the connection's default tenant scope applies.",
  clean: toOptionalString,
});

const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, orders whose `createdOn` falls after the last poll will be emitted on the `created` branch.",
  clean: util.types.toBool,
});

const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When enabled, orders whose `updatedOn` falls after the last poll but were created earlier will be emitted on the `updated` branch.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  connection: connectionInput,
  retailerId,
  showNewRecords,
  showUpdatedRecords,
};
