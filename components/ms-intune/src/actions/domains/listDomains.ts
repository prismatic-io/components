import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listDomainsExamplePayload } from "../../examplePayloads";
import { listDomainsInputs } from "../../inputs";
import { listDomainsOutputSchema } from "../../outputSchemas";

export const listDomains = action({
  display: {
    label: "List Domains",
    description: "Retrieve a list of domain objects.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listDomainsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, pagination, filters }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $filter: filters.$filter,
      $select: filters.$select,
      $expand: filters.$expand,
      $orderBy: filters.$orderBy,
      $top: pagination.$top,
      $skip: pagination.$skip,
      $count: filters.$count,
      $search: filters.$search,
      $format: filters.$format,
      $skipToken: pagination.$skipToken,
    };
    const { data } = await client.get(ENDPOINTS.DOMAINS, {
      params,
    });
    return {
      data,
    };
  },
  examplePerform: async () => listDomainsExamplePayload,
  inputs: listDomainsInputs,
  examplePayload: listDomainsExamplePayload,
});
