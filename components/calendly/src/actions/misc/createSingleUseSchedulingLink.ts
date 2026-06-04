import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, maxEventCount, owner, ownerType } from "../../inputs";
import { createSingleUseSchedulingLinkExamplePayload } from "../../examplePayloads";

export const createSingleUseSchedulingLink = action({
  display: {
    label: "Create Single-Use Scheduling Link",
    description: "Creates a single-use scheduling link.",
  },
  perform: async (context, { connection, maxEventCount, owner, ownerType }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.post("/scheduling_links", {
      max_event_count: maxEventCount,
      owner,
      owner_type: ownerType,
    });
    return { data };
  },
  inputs: {
    connection,
    maxEventCount,
    owner,
    ownerType,
  },
  examplePayload: createSingleUseSchedulingLinkExamplePayload,
});
