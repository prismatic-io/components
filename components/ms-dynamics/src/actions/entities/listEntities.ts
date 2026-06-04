import { action, util } from "@prismatic-io/spectral";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { getWebApiUrl } from "../../client";
import { listEntitiesExamplePayload } from "../../examplePayloads";
import { listEntitiesInputs } from "../../inputs";
import { paginateListEntities } from "../../utils/pagination";

export const listEntities = action({
  display: {
    label: "List Entity Types",
    description:
      "Retrieves a paginated list of entity types available in the Microsoft Dynamics 365 environment.",
  },
  inputs: listEntitiesInputs,
  examplePayload: listEntitiesExamplePayload,
  perform: async (context, { connection, maxPageSize, nextLink, fetchAll }) => {
    const webApiUrl = await getWebApiUrl(connection, context.debug.enabled);
    const token = util.types.toString(connection.token?.access_token);

    const createPageClient = (url?: string) =>
      createHttpClient({
        baseUrl: url ? "" : webApiUrl,
        debug: context.debug.enabled,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "OData-MaxVersion": "4.0",
          "OData-Version": "4.0",
          Prefer: `odata.maxpagesize=${maxPageSize}`,
        },
      });

    try {
      if (fetchAll) {
        const fetchPage = async (url?: string) => {
          const client = createPageClient(url);
          const response = await client.get(url || nextLink || "");
          return { data: response.data as Record<string, unknown> };
        };

        const { data } = await paginateListEntities(fetchPage, true);
        const allValues = (data as Record<string, unknown>)?.value;

        const entities = Array.isArray(allValues)
          ? allValues.map((entity: any) => ({
              name: entity.name,
              kind: entity.kind,
              url: entity.url,
            }))
          : [];

        return {
          data: {
            entities,
            totalCount: entities.length,
            nextLink: null,
            hasMore: false,
          },
        };
      }

      const client = createPageClient(nextLink);
      let result: any;

      if (nextLink) {
        const response = await client.get(nextLink);
        result = response.data;
      } else {
        const response = await client.get("");
        result = response.data;
      }

      const entities =
        result.value?.map((entity: any) => ({
          name: entity.name,
          kind: entity.kind,
          url: entity.url,
        })) || [];

      const responseData = {
        entities,
        totalCount: entities.length,
        nextLink: result["@odata.nextLink"] || null,
        hasMore: Boolean(result["@odata.nextLink"]),
      };

      return { data: responseData };
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error("The specified Dynamics 365 environment or API endpoint was not found");
      }
      if (error.response?.status === 401) {
        throw new Error("Authentication failed. Please check your connection credentials");
      }
      if (error.response?.status === 403) {
        throw new Error("Access denied. Insufficient permissions to list entities");
      }
      throw new Error(`Failed to list entities: ${error.message || error}`);
    }
  },
});
