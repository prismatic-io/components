import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getPersonExamplePayload } from "../../examplePayloads";
import { singlePersonV2OutputSchema } from "../../outputSchemas";

export const getPerson = action({
  display: {
    label: "Get Person",
    description: "Gets details of a person.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`/persons/${id}`);
    return { data };
  },
  inputs: getPersonInputs,
  examplePayload: getPersonExamplePayload,
  examplePerform: async () => getPersonExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: singlePersonV2OutputSchema,
  }),
});
