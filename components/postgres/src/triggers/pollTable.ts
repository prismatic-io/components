import { pollingTrigger } from "@prismatic-io/spectral";
import { pollTableExamplePayload } from "../examplePayloads";
import { pollTableInputs } from "../inputs";
import type { PaginationState, PollTableRow } from "../types";
import { pollTablePerform } from "./pollTablePerform";
export const pollTable = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Retrieves existing and ongoing records from a specified table. Load history once, check for changes on a schedule, or both.",
  },
  inputs: pollTableInputs,
  examplePayload: pollTableExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: 50, concurrentBatchLimit: 3 },
  triggerResolver: {
    resolveItems: (_context, { payload }): PollTableRow[] =>
      Array.isArray(payload.body?.data)
        ? (payload.body.data as PollTableRow[])
        : [],
    getNextPaginationState: (_context, { payload }): PaginationState | null =>
      (payload.paginationState as PaginationState | undefined) ?? null,
  },
  perform: pollTablePerform,
});
