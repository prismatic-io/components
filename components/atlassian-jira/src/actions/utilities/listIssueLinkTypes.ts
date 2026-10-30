import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { listIssueLinkTypesExamplePayload } from "../../examplePayloads";
import { listIssueLinkTypesInputs } from "../../inputs";
import { listIssueLinkTypesOutputSchema } from "../../outputSchemas";

export const listIssueLinkTypes = action({
  display: {
    label: "List Issue Link Types",
    description: "List all available issue link types.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
    );
    const { data } = await client.get("/issueLinkType");
    return { data };
  },
  examplePerform: async () => listIssueLinkTypesExamplePayload,
  inputs: listIssueLinkTypesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listIssueLinkTypesOutputSchema,
  }),
  examplePayload: listIssueLinkTypesExamplePayload,
});
