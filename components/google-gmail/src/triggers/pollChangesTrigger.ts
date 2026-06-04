import { pollingTrigger } from "@prismatic-io/spectral";

import { pollChangesTriggerInputs } from "../inputs";
import { pollChangesTriggerPerform } from "../helpers/pollChangesTriggerPerform";

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Emails",
    description: "Checks for new and updated email messages on a configured schedule.",
  },
  inputs: pollChangesTriggerInputs,
  perform: pollChangesTriggerPerform,
});
