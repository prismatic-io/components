import { dataSource } from "@prismatic-io/spectral";
import { createAnalyticsClient } from "../client";
import { accountId, connectionInput } from "../inputs";
import type { Property } from "../types";
import { paginateRecords } from "../util";

const listProperties = dataSource({
  display: {
    label: "List Properties",
    description: "List Google Analytics GA4 properties for an account",
  },
  inputs: {
    connection: connectionInput,
    accountId: {
      ...accountId,
      dataSource: undefined,
    },
  },
  dataSourceType: "picklist",
  perform: async (_context, params) => {
    const client = createAnalyticsClient({
      connection: params.connection,
      endpointType: "adminv1beta",
    });

    const data = await paginateRecords<Property, "properties">(
      client,
      "/properties",
      {
        filter: `parent:${params.accountId}`,
      },
      true,
      "properties",
    );
    return {
      result: data.properties.map((property) => ({
        key: property.name,
        label: `${property.displayName} - ${property.name}`,
      })),
    };
  },
});

export default { listProperties };
