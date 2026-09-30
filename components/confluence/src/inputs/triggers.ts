import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import { connectionInput } from "./common";
export const lookBackDate = input({
  label: "Look-back Date",
  type: "string",
  required: false,
  comments:
    "Optional ISO 8601 date used as the initial cursor on first deploy, allowing pre-existing records created or updated after this date to be included on the first poll. When omitted the first poll seeds the cursor to now and emits nothing.",
  example: "2026-01-01",
  placeholder: "2026-01-01",
  clean: cleanStringInput,
});
export const pagesPollingTriggerInputs = {
  connectionInput,
  lookBackDate,
};
export const newSpacesPollingTriggerInputs = {
  connectionInput,
  lookBackDate,
};
