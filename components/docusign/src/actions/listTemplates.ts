import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection } from "../inputs";
import { getTemplates } from "../utils";
import { listTemplatesPayload } from "../examplePayloads";

export const listTemplates = action({
  display: {
    label: "List Templates",
    description: "Retrieves the list of templates for the specified account.",
  },
  perform: async (context, { connection }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const data = await getTemplates(client);
    return { data };
  },
  inputs: {
    connection,
  },
  examplePayload: listTemplatesPayload,
});
