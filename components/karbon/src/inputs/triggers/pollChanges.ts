import { input, util } from "@prismatic-io/spectral";
import { lookBackDateClean } from "../../util/polling";
import { pollResourceModel } from "../../utils";
import { connection } from "../shared";

const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  default: "Contacts",
  model: pollResourceModel,
  comments: "The type of Karbon resource to poll for updated records.",
  clean: util.types.toString,
});

const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each record modified on or after this date once.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});

export default {
  connection,
  pollResourceType,
  lookBackDate,
};
