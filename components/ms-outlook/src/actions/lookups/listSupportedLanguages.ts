import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listSupportedLanguagesExamplePayload } from "../../examplePayloads";
import { listSupportedLanguagesInputs } from "../../inputs";




export const listSupportedLanguages = action({
  display: {
    label: "List Supported Languages",
    description: "Lists supported languages for the current user.",
  },
  inputs: listSupportedLanguagesInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.get("/me/outlook/supportedLanguages");
    return { data };
  },
  examplePayload: listSupportedLanguagesExamplePayload,
});
