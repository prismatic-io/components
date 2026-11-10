import { action, outputSchema } from "@prismatic-io/spectral";
import { listSupportedLanguagesOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { listSupportedLanguagesExamplePayload } from "../../examplePayloads";
import { listSupportedLanguagesInputs } from "../../inputs";
import { computeEndpointBasedOnConnection } from "../../util";

export const listSupportedLanguages = action({
  display: {
    label: "List Supported Languages",
    description: "Lists supported languages for the current user.",
  },
  inputs: listSupportedLanguagesInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.get(
      computeEndpointBasedOnConnection(params.connection, "/me/outlook/supportedLanguages"),
    );
    return { data };
  },
  examplePerform: async () => listSupportedLanguagesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSupportedLanguagesOutputSchema,
  }),
  examplePayload: listSupportedLanguagesExamplePayload,
});
