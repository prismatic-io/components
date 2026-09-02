import { action, outputSchema } from "@prismatic-io/spectral";
import { paginatedListSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { listLineItemsExamplePayload } from "../../examplePayloads";
import { listLineItemsInputs } from "../../inputs";
import { getAllPaginatedData, getProps } from "../../util";
export const listLineItems = action({
  display: {
    label: "List Line Items",
    description: "Retrieve a list of all line items.",
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
      "/crm/v3/objects/line_items",
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
  inputs: listLineItemsInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listLineItemsExamplePayload.data,
  }),
  examplePayload: listLineItemsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paginatedListSchema,
  }),
});
