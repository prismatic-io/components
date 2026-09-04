import { dataSource } from "@prismatic-io/spectral";
import { createArenaClient } from "../client";
import {
  ARENA_MAX_PAGE_SIZE,
  ARENA_OUTBOUND_INTEGRATIONS_PATH,
} from "../constants";
import { integrationsPicklistExamplePayload } from "../examplePayloads";
import { integrationsPicklistInputs } from "../inputs";
import type { IntegrationShortRepResult } from "../types";
import { handleArenaError } from "../util";
export const integrationsPicklist = dataSource({
  display: {
    label: "Select Integration",
    description: "Select from available outbound integrations in Arena PLM.",
  },
  dataSourceType: "picklist",
  inputs: integrationsPicklistInputs,
  examplePayload: integrationsPicklistExamplePayload,
  perform: async (context, { connection, name, enabled }) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        name,
        enabled: enabled === "all" ? undefined : enabled,
        limit: ARENA_MAX_PAGE_SIZE,
      };
      context.logger.info("Fetching outbound integrations for datasource", {
        queryParamNames: Object.keys(queryParams),
      });
      const response = await client.get(ARENA_OUTBOUND_INTEGRATIONS_PATH, {
        params: queryParams,
      });
      const responseData = response.data as IntegrationShortRepResult;
      const result =
        responseData.results
          ?.map((integration) => {
            const labelParts = [
              integration.name || "Unnamed Integration",
              integration.type ? `(${integration.type})` : undefined,
            ].filter(Boolean);
            return {
              label: labelParts.join(" "),
              key: integration.guid || "",
            };
          })
          .filter((entry) => entry.key) || [];
      return { result };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get Integrations Datasource");
      return { result: [] };
    }
  },
});
