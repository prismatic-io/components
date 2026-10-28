import { action, outputSchema } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { COMPANY_PROPS, hubspotPaths } from "../../constants";
import { listCompaniesExamplePayload } from "../../examplePayloads";
import { listCompaniesInputs } from "../../inputs";
import { paginatedListSchema } from "../../outputSchemas";
import { getAllPaginatedData, getProps } from "../../util";
export const listCompanies = action({
  display: {
    label: "List Companies",
    description: "Retrieve a list of all companies.",
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
      COMPANY_PROPS,
      params.additionalProperties || [],
    );
    const url = hubspotPaths.objects("companies");
    const configParams = {
      ...parameterizedProperties,
      limit: params.pagination.limit,
      after: params.pagination.after,
      associations: params.associationsList,
      archived: params.archived,
    };
    const data = await getAllPaginatedData(
      client,
      url,
      params.fetchAll,
      false,
      {
        params: configParams,
      },
    );
    return {
      data,
    };
  },
  inputs: listCompaniesInputs,
  examplePerform: async () => ({
    data: listCompaniesExamplePayload.data,
  }),
  examplePayload: listCompaniesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: paginatedListSchema,
  }),
});
