import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { listTemplatesPayload } from "../examplePayloads";
import { paginateResults } from "../helpers/pagination";
import { connection, fetchAll } from "../inputs";

export const listTemplates = action({
  display: {
    label: "List Templates",
    description: "Retrieves the list of templates for the specified account.",
  },
  perform: async (context, { connection, fetchAll }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    return await paginateResults({
      client,
      endpoint: "/templates",
      fetchAll,
      itemsKey: "envelopeTemplates",
    });
  },
  inputs: {
    connection,
    fetchAll,
  },
  examplePayload: listTemplatesPayload,
});
