import { input, util } from "@prismatic-io/spectral";
import {
  lookBackDateClean,
  standardRecordTypeClean,
  toOptionalString,
} from "../utils";
import { connectionInput } from "./common";
import { recordTypeInput } from "./records";

const pollRecordTypeInput = input({
  ...recordTypeInput,
  clean: standardRecordTypeClean,
  comments: "Record type to poll for new and updated records.",
});

const showNewRecordsInput = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, includes new records in the results.",
  clean: util.types.toBool,
});

const showUpdatedRecordsInput = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, includes updated records in the results.",
  clean: util.types.toBool,
});

const lookBackDateInput = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once, ignoring the visibility and query filters.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});

const additionalFilterInput = input({
  label: "Additional Filter",
  type: "string",
  required: false,
  comments:
    "Additional WHERE clause conditions to append to the polling query. Do not include 'AND' prefix - it will be added automatically. See [Record Collection Filtering](https://docs.oracle.com/en/cloud/saas/netsuite/ns-online-help/section_1545222128.html) for query syntax.",
  example: "isinactive = 'F'",
  placeholder: "Enter additional filter conditions",
  clean: toOptionalString,
});

export const pollRecordsInputs = {
  recordType: pollRecordTypeInput,
  lookBackDate: lookBackDateInput,
  connection: connectionInput,
  showNewRecords: showNewRecordsInput,
  showUpdatedRecords: showUpdatedRecordsInput,
  additionalFilter: additionalFilterInput,
};
