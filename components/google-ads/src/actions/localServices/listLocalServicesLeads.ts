import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listLocalServicesLeadsExamplePayload } from "../../examplePayloads";
import { listLocalServicesLeadsInputs } from "../../inputs";
import { listLocalServicesLeadsOutputSchema } from "../../outputSchemas";
import { buildLocalServicesLeadsQuery, searchGoogleAds } from "../../util";

export const listLocalServicesLeads = action({
  display: {
    label: "List Local Services Leads",
    description:
      "Lists the Local Services leads of a customer, newest first, optionally limited to a creation date range.",
  },
  inputs: listLocalServicesLeadsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listLocalServicesLeadsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      customerId,
      managerCustomerId,
      startDateInput,
      endDateInput,
      fetchAll,
      pageTokenInput,
    },
  ) => {
    const client = createClient({
      connection: connection,
      debugEnabled: context.debug.enabled,
      logger: context.logger,
      loginCustomerId: managerCustomerId,
    });
    const data = await searchGoogleAds(client, {
      customerId,
      fetchAll,
      params: {
        query: buildLocalServicesLeadsQuery(startDateInput, endDateInput),
        pageToken: pageTokenInput,
      },
    });
    return { data };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    listLocalServicesLeadsExamplePayload,
  examplePayload: listLocalServicesLeadsExamplePayload,
});
