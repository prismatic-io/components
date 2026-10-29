import { action } from "@prismatic-io/spectral";
import { connectionInput, type, domain } from "../inputs";
import { createClient } from "../client";
import { generatePayload } from "../util";

export const listCards = action({
  display: {
    description:
      "Gets the list of credit cards that are assigned at the domain level.",
    label: "List Cards",
  },
  inputs: {
    connectionInput,
    type: {
      ...type,
      default: "domainCardList",
      comments:
        "Specifies to the job that it has to list the cards of a domain.",
    },
    domain,
  },
  perform: async (context, { connectionInput, type, domain }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const json = {
      inputSettings: {
        type: type || undefined,
        domain: domain || undefined,
      },
    };
    const generatedJson = generatePayload(json, connectionInput);

    const { data } = await client.post("", generatedJson);
    return {
      data,
    };
  },
});
