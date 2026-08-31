import type { ActionOutputSchema, PerformSafety } from "@prismatic-io/spectral";
import { action, outputSchema } from "@prismatic-io/spectral";
import { camelCase, startCase } from "lodash";
import { createClient } from "../../client";
import { googleAdsSearchPath } from "../../constants";
import {
  getConversionActionExamplePayload,
  getCustomerExamplePayload,
} from "../../examplePayloads";
import { customerEntityInputs } from "../../inputs";
import {
  getConversionActionOutputSchema,
  getCustomerOutputSchema,
} from "../../outputSchemas";
import { cleanCustomerId } from "../../util";
const customerEntities = {
  customer: ["id", "descriptive_name", "status", "test_account", "manager"],
  conversion_action: ["id", "name", "resource_name"],
};
const entityExamplePayloads: Record<
  string,
  {
    data: unknown;
  }
> = {
  customer: getCustomerExamplePayload,
  conversion_action: getConversionActionExamplePayload,
};
const entityOutputSchemas: Record<string, ActionOutputSchema["schema"]> = {
  customer: getCustomerOutputSchema,
  conversion_action: getConversionActionOutputSchema,
};
const entityPerformSafety: Record<string, PerformSafety> = {
  customer: "safe",
  conversion_action: "notAllowed",
};
const entityExamplePerforms: Record<
  string,
  | (() => Promise<{
      data: unknown;
    }>)
  | undefined
> = {
  conversion_action: async (): Promise<{
    data: unknown;
  }> => getConversionActionExamplePayload,
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
      inputs: customerEntityInputs,
      outputSchema: outputSchema({
        type: "actionOutput",
        schema: entityOutputSchemas[entityName],
      }),
      performSafety: entityPerformSafety[entityName],
      perform: async (context, params) => {
        const client = createClient({
          connection: params.connection,
          debugEnabled: context.debug.enabled,
          logger: context.logger,
          loginCustomerId: params.managerCustomerId,
        });
        const id = cleanCustomerId(params.customerId);
        const { data } = await client.post(googleAdsSearchPath(id), {
          pageToken: params.pageToken || undefined,
          query: `SELECT ${querySelect} FROM ${entityName}`,
        });
        return { data };
      },
      examplePerform: entityExamplePerforms[entityName],
      examplePayload: entityExamplePayloads[entityName],
    });
    result[key] = entityAction;
    return result;
  },
  {} as Record<string, unknown>,
);
