import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { importEventsInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { importEventsExamplePayload } from "../../examplePayloads";
import { importEventsOutputSchema } from "../../outputSchemas";
export const importEvents = action({
  display: {
    label: "Import Events",
    description: "Each request ingests a batch of events into Mixpanel.",
  },
  inputs: importEventsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: importEventsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, region, events, project_id, useProjectToken },
  ) => {
    const client = createClient(
      region,
      connection,
      useProjectToken ? Authorization.Token : Authorization.Account,
      context.debug.enabled,
    );
    const { data } = await client.post("/import", events, {
      params: { project_id },
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => importEventsExamplePayload,
  examplePayload: importEventsExamplePayload,
});
