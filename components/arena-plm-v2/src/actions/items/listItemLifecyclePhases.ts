import { action } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listItemLifecyclePhasesExamplePayload } from "../../examplePayloads";
import { listItemLifecyclePhasesInputs } from "../../inputs";
import { handleArenaError } from "../../util";
export const listItemLifecyclePhases = action({
  display: {
    label: "List Item Lifecycle Phases",
    description: "List all lifecycle phases for items from Arena PLM system.",
  },
  inputs: listItemLifecyclePhasesInputs,
  examplePayload: listItemLifecyclePhasesExamplePayload,
  perform: async (context, { connection }) => {
    try {
      context.logger.info("Getting item lifecycle phases");
      const client = await createArenaClient(context, connection);
      const { data } = await client.get("/settings/items/lifecyclephases");
      context.logger.info("Retrieved item lifecycle phases", {
        count: data?.length || 0,
      });
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Item Lifecycle Phases");
    }
  },
});
