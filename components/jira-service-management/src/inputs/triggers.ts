import { input } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connection, serviceDeskId } from "./common";

export const onNewRequestInputs = {
  connection,
  serviceDeskId: {
    ...serviceDeskId,
    required: false,
    comments:
      "Limits new requests to a specific service desk. When omitted, requests from all accessible service desks are returned.",
    clean: toOptionalString,
  },
};



const opsAlertAdditionalQuery = input({
  label: "Additional Query",
  type: "string",
  required: false,
  comments:
    "Atlassian Ops query terms appended to the built-in createdAt filter. Uses OpsGenie query language syntax.",
  placeholder: "Enter additional query terms",
  example: "status: open AND priority: P1",
  clean: toOptionalString,
});

export const onNewOpsAlertInputs = {
  connection,
  opsAlertAdditionalQuery,
};
