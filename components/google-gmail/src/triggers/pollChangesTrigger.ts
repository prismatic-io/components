import { pollingTrigger } from "@prismatic-io/spectral";
import { DEFAULT_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads/triggers";
import { pollChangesTriggerPerform } from "../helpers/pollChangesTriggerPerform";
import { pollChangesTriggerInputs } from "../inputs";
import type { GmailRecordChange } from "../util/polling";
import { resolveGmailRecordChanges } from "../util/polling";
export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Emails",
    description:
      "Retrieves existing and ongoing email messages for a specified Gmail mailbox. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollChangesTriggerInputs,
  examplePayload: pollChangesTriggerExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): GmailRecordChange[] =>
      resolveGmailRecordChanges(payload.body.data as Record<string, unknown>),
  },
  perform: pollChangesTriggerPerform,
});
