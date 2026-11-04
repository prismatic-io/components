import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCardsExamplePayload } from "../../examplePayloads";
import { listCardsInputs } from "../../inputs";
import { listCardsOutputSchema } from "../../outputSchemas";
import { generatePayload } from "../../util";

export const listCards = action({
  display: {
    description:
      "Gets the list of credit cards that are assigned at the domain level.",
    label: "List Cards",
  },
  inputs: listCardsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCardsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connectionInput, type, domain }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      inputSettings: {
        type,
        domain,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
  examplePerform: async () => listCardsExamplePayload,
  examplePayload: listCardsExamplePayload,
});
