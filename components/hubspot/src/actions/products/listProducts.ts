import { action, outputSchema } from "@prismatic-io/spectral";
import { paginatedListSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { listProductsExamplePayload } from "../../examplePayloads";
import { listProductsInputs } from "../../inputs";
import { getAllPaginatedData, getProps } from "../../util";
export const listProducts = action({
  display: {
    label: "List Products",
    description: "Retrieve a list of all products.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection: params.hubspotConnection,
      timeout: params.timeout,
      debugRequest,
    });
    const parameterizedProperties = getProps(
      ["name"],
      params.additionalProperties || [],
    );
    const data = await getAllPaginatedData(
      client,
      "/crm/v3/objects/products",
      params.fetchAll,
      false,
      {
        params: {
          ...parameterizedProperties,
          limit: params.pagination.limit,
          after: params.pagination.after,
          associations: params.associationsList,
          archived: params.archived,
        },
      },
    );
    return {
      data,
    };
  },
  inputs: listProductsInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listProductsExamplePayload.data,
  }),
  examplePayload: listProductsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paginatedListSchema,
  }),
});
