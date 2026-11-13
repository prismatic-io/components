import { action, outputSchema } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { listChangesExamplePayload } from "../../examplePayloads";
import { listChangesInputs } from "../../inputs";
import { listChangesOutputSchema } from "../../outputSchemas";
import { resolveQueryParameters } from "../../util";

export const listChanges = action({
  display: {
    label: "List Changes",
    description: "Tracks changes in a driveItem and its children over time.",
  },
  inputs: listChangesInputs,
  performSafety: "notAllowed",
  perform: async (context, { oneDriveConnection, deltaURL, ...query }) => {
    const client = getOneDriveClient(oneDriveConnection, context.debug.enabled);
    const { data } = await client.get(deltaURL, {
      params: resolveQueryParameters(query),
    });
    return { data };
  },
  examplePerform: async () => listChangesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listChangesOutputSchema,
  }),
  examplePayload: listChangesExamplePayload,
});
