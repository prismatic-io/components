import { action, outputSchema } from "@prismatic-io/spectral";
import { paginatedListSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { listContactsExamplePayload } from "../../examplePayloads";
import { listContactsInputs } from "../../inputs";
import { getAllPaginatedData, getProps } from "../../util";
import { CONTACT_PROPS } from "../../constants";
export const listContacts = action({
  display: {
    label: "List Contacts",
    description: "Retrieve a list of all contacts.",
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
      CONTACT_PROPS,
      params.additionalProperties || [],
    );
    const data = await getAllPaginatedData(
      client,
      "/crm/v3/objects/contacts",
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
    return { data };
  },
  inputs: listContactsInputs,
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listContactsExamplePayload.data,
  }),
  examplePayload: listContactsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paginatedListSchema,
  }),
});
