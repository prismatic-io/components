import { input } from "@prismatic-io/spectral";
import { lookBackDateClean, toOptionalString } from "../util";
import { connection, serviceDeskId } from "./common";
const createLookBackDate = (item: string) =>
  input({
    label: "Look-back Date",
    placeholder: "Enter look-back date (YYYY-MM-DD)",
    type: "string",
    required: false,
    comments: `The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each ${item} created on or after this date once.`,
    example: "2026-01-01",
    clean: lookBackDateClean,
  });
export const onNewRequestInputs = {
  connection,
  lookBackDate: createLookBackDate("service request"),
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
  lookBackDate: createLookBackDate("alert"),
  opsAlertAdditionalQuery,
};
