import { action, input } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput } from "../../inputs";
import { cleanString } from "../../util";

export const getCurrencies = action({
  display: {
    label: "Get Currencies",
    description: "Gets all supported currencies.",
  },
  perform: async (context, { connection, term }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/currencies", { params: { term } });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    term: input({
      label: "Term",
      type: "string",
      clean: cleanString,
      comments: "Optional search term that is searched for from currency's name and/or code",
    }),
  },
});
