import { dataSource } from "@prismatic-io/spectral";
import { createArenaClient } from "../client";
import { outboundEventIntegrationsPicklistExamplePayload } from "../examplePayloads";
import { outboundEventIntegrationsPicklistInputs } from "../inputs";
import type { OutboundEventIntegrationVoResultRep } from "../types";
import { handleArenaError } from "../util";
export const outboundEventIntegrationsPicklist = dataSource({
  display: {
    label: "Select Outbound Event Integration",
    description:
      "Select from available outbound event integrations in Arena PLM.",
  },
  dataSourceType: "picklist",
  inputs: outboundEventIntegrationsPicklistInputs,
  perform: async (context, { connection, name, enabled }) => {
    try {
      const client = await createArenaClient(context, connection);
      const params = new URLSearchParams();
      if (name) {
        params.append("name", name);
      }
      if (enabled !== "all") {
        params.append("enable", enabled);
      }
      params.append("limit", "400");
      const queryString = params.toString();
      const endpoint = queryString
        ? `/outboundevents?${queryString}`
        : "/outboundevents?limit=400";
      context.logger.info(
        "Fetching outbound event integrations for datasource",
        {
          name,
          enabled,
        },
      );
      const response = await client.get(endpoint);
      const responseData = response.data as OutboundEventIntegrationVoResultRep;
      context.logger.info(
        `Successfully retrieved ${responseData.count || 0} outbound event integrations for datasource`,
      );
      const results =
        responseData.results?.map((integration) => ({
          label: integration.name || "Unnamed Integration",
          key: integration.guid,
        })) || [];
      return { result: results };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "Get Outbound Event Integrations Datasource",
      );
      return { result: [] };
    }
  },
  examplePayload: outboundEventIntegrationsPicklistExamplePayload,
});
