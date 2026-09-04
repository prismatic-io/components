import { dataSource } from "@prismatic-io/spectral";
import { createArenaClient } from "../client";
import { notificationJsonFormInputs } from "../inputs";
import type { ArenaAttribute, JsonFormUiSchema, ResourceType } from "../types";
import { handleArenaError } from "../util";
import {
  createSchema,
  createUiSchema,
  fetchQualityAttributes,
  fetchStandardAttributes,
  resourceObjectTypes,
} from "../util/notificationJsonFormHelpers";
export const notificationJsonForm = dataSource({
  display: {
    label: "Notification JSON Form",
    description:
      "Configure notification enablement, delivery channel, resource type, and message fields.",
  },
  dataSourceType: "jsonForm",
  inputs: notificationJsonFormInputs,
  perform: async (context, { connection }) => {
    const actionContext = "Get Notification JSON Form Datasource";
    try {
      const client = await createArenaClient(context, connection);
      const [
        itemAttributes,
        changeAttributes,
        requestAttributes,
        qualityAttributes,
      ] = await Promise.all([
        fetchStandardAttributes(client, resourceObjectTypes.ITEM),
        fetchStandardAttributes(client, resourceObjectTypes.CHANGE),
        fetchStandardAttributes(client, resourceObjectTypes.REQUEST),
        fetchQualityAttributes(client),
      ]);
      const attributesByResource: Record<ResourceType, ArenaAttribute[]> = {
        ITEM: itemAttributes,
        CHANGE: changeAttributes,
        QUALITY: qualityAttributes,
        REQUEST: requestAttributes,
      };
      context.logger.info("Notification JSON form attributes loaded", {
        itemCount: itemAttributes.length,
        changeCount: changeAttributes.length,
        requestCount: requestAttributes.length,
        qualityCount: qualityAttributes.length,
      });
      return {
        result: {
          schema: createSchema(attributesByResource),
          uiSchema: createUiSchema(
            attributesByResource,
          ) as unknown as JsonFormUiSchema,
          data: {
            notificationEnabled: true,
            deliveryChannel: null,
            deliveryUrl: null,
            deliveryApiKey: null,
            resourceType: null,
            itemMessageFields: [],
            changeMessageFields: [],
            qualityMessageFields: [],
            requestMessageFields: [],
          },
        },
      };
    } catch (error) {
      handleArenaError(error, context.logger, actionContext);
      throw error;
    }
  },
});
