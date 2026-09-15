import { action, outputSchema } from "@prismatic-io/spectral";
import { createSingleUseSchedulingLinkOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { createSingleUseSchedulingLinkInputs } from "../../inputs";
import { createSingleUseSchedulingLinkExamplePayload } from "../../examplePayloads";
export const createSingleUseSchedulingLink = action({
  display: {
    label: "Create Single-Use Scheduling Link",
    description: "Creates a single-use scheduling link.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, maxEventCount, owner, ownerType }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.post("/scheduling_links", {
      max_event_count: maxEventCount,
      owner,
      owner_type: ownerType,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createSingleUseSchedulingLinkExamplePayload.data,
  }),
  inputs: createSingleUseSchedulingLinkInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createSingleUseSchedulingLinkOutputSchema,
  }),
  examplePayload: createSingleUseSchedulingLinkExamplePayload,
});
