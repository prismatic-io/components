import { pollingTrigger } from "@prismatic-io/spectral";
import { pollEventsTriggerPayload } from "../examplePayloads";
import { pollEventsTriggerPerform } from "../helpers/pollEventsTriggerPerform";
import { pollEventsTriggerInputs } from "../inputs";

export const pollEventsTrigger = pollingTrigger({
  display: {
    label: "New and Updated Events",
    description:
      "Checks for new and updated calendar events on a configured schedule.",
  },
  inputs: pollEventsTriggerInputs,
  perform: pollEventsTriggerPerform,
  examplePayload: pollEventsTriggerPayload,
});
