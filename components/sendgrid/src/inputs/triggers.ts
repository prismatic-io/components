import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./shared";
const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, newly created records (a `processed` event observed within the polling window) are included on the `created` branch. SendGrid surfaces a single `last_event_time` per message, so the `created` vs `updated` split is best-effort based on the event timeline.",
  clean: util.types.toBool,
});
const showUpdatedRecords = input({
  label: "Show Updated Records",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "When true, records whose `last_event_time` falls within the polling window are included on the `updated` branch.",
  clean: util.types.toBool,
});
export const pollChangesInputs = {
  sendGridConnection: connectionInput,
  showNewRecords,
  showUpdatedRecords,
};
