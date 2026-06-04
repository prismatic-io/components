import { action } from "@prismatic-io/spectral";
import { camelCase, startCase } from "lodash";
import { createClient } from "../../client";
import {
  getConversionActionExamplePayload,
  getCustomerExamplePayload,
} from "../../examplePayloads";
import {
  connectionInput,
  customerIdInput,
  managerCustomerIdInput,
  pageTokenInput,
} from "../../inputs";
import { cleanCustomerId } from "../../util";





const customerEntities = {
  customer: ["id", "descriptive_name", "status", "test_account", "manager"],
  conversion_action: ["id", "name", "resource_name"],
};



const entityExamplePayloads: Record<string, { data: unknown }> = {
  customer: getCustomerExamplePayload,
  conversion_action: getConversionActionExamplePayload,
};

export const customerEntityActions = Object.entries(customerEntities).reduce(
  (result, [entityName, fieldsList]) => {
    const key = camelCase(`get ${entityName}`);
    const name = startCase(entityName);
    const querySelect = fieldsList
      .map((field) => `${entityName}.${field}`)
      .join(", ");

    const entityAction = action({
      display: {
        label: `Get ${name}`,
        description: `Retrieve ${name} data for a customer account.`,
      },
      inputs: {
        connection: connectionInput,
        customerId: customerIdInput,
        managerCustomerId: { ...managerCustomerIdInput, required: false },
        pageToken: pageTokenInput,
      },
      perform: async (context, params) => {
        const client = createClient(
          params.connection,
          context.debug.enabled,
          context.logger,
          params.managerCustomerId,
        );
        const id = cleanCustomerId(params.customerId);
        const { data } = await client.post(
          `/customers/${id}/googleAds:search`,
          {
            pageToken: params.pageToken || undefined,
            query: `SELECT ${querySelect} FROM ${entityName}`,
          },
        );
        return { data };
      },
      examplePayload: entityExamplePayloads[entityName],
    });
    result[key] = entityAction;
    return result;
  },
  {} as Record<string, unknown>,
);
