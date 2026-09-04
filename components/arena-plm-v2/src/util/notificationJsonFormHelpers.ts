import type { createArenaClient } from "../client";
import type {
  ArenaAttribute,
  JsonFormSchema,
  MessageFieldPropertyKey,
  ResourceType,
} from "../types";
export const DELIVERY_CHANNEL_OPTIONS = [
  { const: "MS_TEAMS", title: "Teams" },
  { const: "SLACK", title: "Slack" },
];
export const RESOURCE_TYPE_OPTIONS: Array<{
  const: ResourceType;
  title: ResourceType;
}> = [
  { const: "ITEM", title: "ITEM" },
  { const: "CHANGE", title: "CHANGE" },
  { const: "QUALITY", title: "QUALITY" },
  { const: "REQUEST", title: "REQUEST" },
];
export const resourceObjectTypes: Record<
  Exclude<ResourceType, "QUALITY">,
  string
> = {
  ITEM: "items",
  CHANGE: "changes",
  REQUEST: "requests",
};
export const messageFieldPropertyKeys: Record<
  ResourceType,
  MessageFieldPropertyKey
> = {
  ITEM: "itemMessageFields",
  CHANGE: "changeMessageFields",
  QUALITY: "qualityMessageFields",
  REQUEST: "requestMessageFields",
};
export const resourceBindingNames: Record<ResourceType, string> = {
  ITEM: "ITEM",
  CHANGE: "CHANGE",
  QUALITY: "QUALITY",
  REQUEST: "REQUEST",
};
export const buildMessageFieldOptions = (attributes: ArenaAttribute[]) =>
  attributes.map((attribute) => ({
    const: attribute.apiName,
    title: attribute.name || attribute.apiName,
  }));
export const buildMessageFieldProperty = (
  attributes: ArenaAttribute[],
  title: string,
) => {
  if (attributes.length === 0) {
    return {
      type: "array",
      title,
      uniqueItems: true,
      items: {
        type: "string",
      },
      default: [],
    };
  }
  return {
    type: "array",
    title,
    uniqueItems: true,
    items: {
      type: "string",
      oneOf: buildMessageFieldOptions(attributes),
    },
    default: [],
  };
};
export const buildResourceBindingValue = (
  resourceType: ResourceType,
  apiName: string,
) => `{{${resourceBindingNames[resourceType]}.${apiName}}}`;
export const buildStep2Rule = () => ({
  effect: "SHOW",
  condition: {
    scope: "#/properties/notificationEnabled",
    schema: { const: true },
    failWhenUndefined: true,
  },
});
export const buildDeliveryDetailsRule = () => ({
  effect: "SHOW",
  condition: {
    scope: "#/properties/deliveryChannel",
    schema: { type: "string" },
    failWhenUndefined: true,
  },
});
export const buildStep3Rule = () => ({
  effect: "SHOW",
  condition: {
    scope: "#",
    schema: {
      properties: {
        notificationEnabled: { const: true },
        deliveryChannel: { type: "string" },
      },
      required: ["notificationEnabled", "deliveryChannel"],
    },
    failWhenUndefined: true,
  },
});
export const buildStep4Rule = () => ({
  effect: "SHOW",
  condition: {
    scope: "#",
    schema: {
      properties: {
        notificationEnabled: { const: true },
        deliveryChannel: { type: "string" },
        resourceType: { type: "string" },
      },
      required: ["notificationEnabled", "deliveryChannel", "resourceType"],
    },
    failWhenUndefined: true,
  },
});
export const buildStep5Rule = () => ({
  effect: "SHOW",
  condition: {
    scope: "#",
    schema: {
      properties: {
        notificationEnabled: { const: true },
        deliveryChannel: { type: "string" },
      },
      required: ["notificationEnabled", "deliveryChannel"],
      anyOf: [
        {
          properties: {
            resourceType: { const: "ITEM" },
            itemMessageFields: { type: "array", minItems: 1 },
          },
          required: ["resourceType", "itemMessageFields"],
        },
        {
          properties: {
            resourceType: { const: "CHANGE" },
            changeMessageFields: { type: "array", minItems: 1 },
          },
          required: ["resourceType", "changeMessageFields"],
        },
        {
          properties: {
            resourceType: { const: "QUALITY" },
            qualityMessageFields: { type: "array", minItems: 1 },
          },
          required: ["resourceType", "qualityMessageFields"],
        },
        {
          properties: {
            resourceType: { const: "REQUEST" },
            requestMessageFields: { type: "array", minItems: 1 },
          },
          required: ["resourceType", "requestMessageFields"],
        },
      ],
    },
    failWhenUndefined: true,
  },
});
export const buildResourceRule = (resourceType: ResourceType) => ({
  effect: "SHOW",
  condition: {
    scope: "#",
    schema: {
      properties: {
        notificationEnabled: { const: true },
        resourceType: { const: resourceType },
      },
      required: ["notificationEnabled", "resourceType"],
    },
  },
});
export const buildSelectionRule = (
  resourceType: ResourceType,
  propertyKey: MessageFieldPropertyKey,
  apiName: string,
) => ({
  effect: "SHOW",
  condition: {
    scope: "#",
    schema: {
      properties: {
        notificationEnabled: { const: true },
        resourceType: { const: resourceType },
        [propertyKey]: {
          type: "array",
          contains: { const: apiName },
        },
      },
      required: ["notificationEnabled", "resourceType", propertyKey],
    },
  },
});
export const buildPreviewElements = (
  resourceType: ResourceType,
  propertyKey: MessageFieldPropertyKey,
  attributes: ArenaAttribute[],
) =>
  attributes.map((attribute) => ({
    type: "Label",
    text: `${attribute.name || attribute.apiName}: ${buildResourceBindingValue(resourceType, attribute.apiName)}`,
    rule: buildSelectionRule(resourceType, propertyKey, attribute.apiName),
  }));
export const buildEmptyAttributeRule = (resourceType: ResourceType) => ({
  effect: "SHOW",
  condition: {
    scope: "#",
    schema: {
      properties: {
        notificationEnabled: { const: true },
        resourceType: { const: resourceType },
      },
      required: ["notificationEnabled", "resourceType"],
    },
  },
});
export const normalizeAttributes = (
  attributes: ArenaAttribute[],
): ArenaAttribute[] => {
  const byApiName = new Map<string, ArenaAttribute>();
  for (const attribute of attributes) {
    if (!attribute?.apiName) {
      continue;
    }
    if (!byApiName.has(attribute.apiName)) {
      byApiName.set(attribute.apiName, attribute);
    }
  }
  return Array.from(byApiName.values()).sort((left, right) => {
    const leftLabel = left.name || left.apiName;
    const rightLabel = right.name || right.apiName;
    return leftLabel.localeCompare(rightLabel);
  });
};
export const extractAttributes = (payload: unknown): ArenaAttribute[] => {
  if (
    payload &&
    typeof payload === "object" &&
    "results" in payload &&
    Array.isArray(
      (
        payload as {
          results?: unknown[];
        }
      ).results,
    )
  ) {
    return (
      (
        payload as {
          results: ArenaAttribute[];
        }
      ).results ?? []
    ).filter(Boolean);
  }
  return [];
};
export const fetchStandardAttributes = async (
  client: Awaited<ReturnType<typeof createArenaClient>>,
  objectType: string,
): Promise<ArenaAttribute[]> => {
  const response = await client.get(`/settings/${objectType}/attributes`);
  return normalizeAttributes(extractAttributes(response.data));
};
export const fetchQualityAttributes = async (
  client: Awaited<ReturnType<typeof createArenaClient>>,
): Promise<ArenaAttribute[]> => {
  const [qualityResponse, stepResponse] = await Promise.all([
    client.get("/settings/qualityprocesses/attributes"),
    client.get("/settings/qualityprocesses/steps/attributes"),
  ]);
  return normalizeAttributes([
    ...extractAttributes(qualityResponse.data),
    ...extractAttributes(stepResponse.data),
  ]);
};
export const createSchema = (
  attributesByResource: Record<ResourceType, ArenaAttribute[]>,
): JsonFormSchema => ({
  type: "object",
  properties: {
    notificationEnabled: {
      type: "boolean",
      title: "Enable Notifications",
      default: true,
    },
    deliveryChannel: {
      type: ["string", "null"],
      title: "Delivery Channel",
      oneOf: DELIVERY_CHANNEL_OPTIONS,
      default: null,
    },
    deliveryUrl: {
      type: ["string", "null"],
      title: "URL",
      default: null,
    },
    deliveryApiKey: {
      type: ["string", "null"],
      title: "API Key",
      default: null,
    },
    resourceType: {
      type: ["string", "null"],
      title: "Resource Type",
      oneOf: RESOURCE_TYPE_OPTIONS,
      default: null,
    },
    itemMessageFields: buildMessageFieldProperty(
      attributesByResource.ITEM,
      "Item Attributes",
    ),
    changeMessageFields: buildMessageFieldProperty(
      attributesByResource.CHANGE,
      "Change Attributes",
    ),
    qualityMessageFields: buildMessageFieldProperty(
      attributesByResource.QUALITY,
      "Quality Attributes",
    ),
    requestMessageFields: buildMessageFieldProperty(
      attributesByResource.REQUEST,
      "Request Attributes",
    ),
  },
});
export const createUiSchema = (
  attributesByResource: Record<ResourceType, ArenaAttribute[]>,
) => ({
  type: "VerticalLayout",
  elements: [
    {
      type: "Group",
      label: "Step 1: Notifications",
      elements: [
        {
          type: "Label",
          text: "Choose whether notifications should be enabled for this configuration.",
        },
        {
          type: "Control",
          scope: "#/properties/notificationEnabled",
          label: "Enable Notifications",
        },
      ],
    },
    {
      type: "Group",
      label: "Step 2: Delivery Channel",
      rule: buildStep2Rule(),
      elements: [
        {
          type: "Label",
          text: "Select where the notification should be delivered when it is sent.",
        },
        {
          type: "Control",
          scope: "#/properties/deliveryChannel",
          label: "Delivery Channel",
        },
        {
          type: "Control",
          scope: "#/properties/deliveryUrl",
          label: "URL",
          rule: buildDeliveryDetailsRule(),
        },
        {
          type: "Control",
          scope: "#/properties/deliveryApiKey",
          label: "API Key",
          rule: buildDeliveryDetailsRule(),
        },
      ],
    },
    {
      type: "Group",
      label: "Step 3: Resource Type",
      rule: buildStep3Rule(),
      elements: [
        {
          type: "Label",
          text: "Choose the Arena resource type whose fields should be included in the notification message. The next step uses this selected resource type in each default binding.",
        },
        {
          type: "Control",
          scope: "#/properties/resourceType",
          label: "Resource Type",
        },
      ],
    },
    {
      type: "Group",
      label: "Step 4: Message Fields",
      rule: buildStep4Rule(),
      elements: [
        {
          type: "Label",
          text: "Select the resource fields to include in the notification. Each selected field will appear as one line in the final message preview.",
        },
        {
          type: "Control",
          scope: "#/properties/itemMessageFields",
          label: "Item Attributes",
          rule: buildResourceRule("ITEM"),
          options: { format: "checkboxes", columns: 2 },
        },
        ...(attributesByResource.ITEM.length === 0
          ? [
              {
                type: "Label",
                text: "No item attributes available.",
                rule: buildEmptyAttributeRule("ITEM"),
              },
            ]
          : []),
        {
          type: "Control",
          scope: "#/properties/changeMessageFields",
          label: "Change Attributes",
          rule: buildResourceRule("CHANGE"),
          options: { format: "checkboxes", columns: 2 },
        },
        ...(attributesByResource.CHANGE.length === 0
          ? [
              {
                type: "Label",
                text: "No change attributes available.",
                rule: buildEmptyAttributeRule("CHANGE"),
              },
            ]
          : []),
        {
          type: "Control",
          scope: "#/properties/qualityMessageFields",
          label: "Quality Attributes",
          rule: buildResourceRule("QUALITY"),
          options: { format: "checkboxes", columns: 2 },
        },
        ...(attributesByResource.QUALITY.length === 0
          ? [
              {
                type: "Label",
                text: "No quality attributes available.",
                rule: buildEmptyAttributeRule("QUALITY"),
              },
            ]
          : []),
        {
          type: "Control",
          scope: "#/properties/requestMessageFields",
          label: "Request Attributes",
          rule: buildResourceRule("REQUEST"),
          options: { format: "checkboxes", columns: 2 },
        },
        ...(attributesByResource.REQUEST.length === 0
          ? [
              {
                type: "Label",
                text: "No request attributes available.",
                rule: buildEmptyAttributeRule("REQUEST"),
              },
            ]
          : []),
      ],
    },
    {
      type: "Group",
      label: "Step 5: Review",
      rule: buildStep5Rule(),
      elements: [
        {
          type: "Label",
          text: "Preview the message lines that will be generated from your selected fields.",
        },
        {
          type: "Group",
          label: "Preview",
          elements: [
            ...buildPreviewElements(
              "ITEM",
              messageFieldPropertyKeys.ITEM,
              attributesByResource.ITEM,
            ),
            ...buildPreviewElements(
              "CHANGE",
              messageFieldPropertyKeys.CHANGE,
              attributesByResource.CHANGE,
            ),
            ...buildPreviewElements(
              "QUALITY",
              messageFieldPropertyKeys.QUALITY,
              attributesByResource.QUALITY,
            ),
            ...buildPreviewElements(
              "REQUEST",
              messageFieldPropertyKeys.REQUEST,
              attributesByResource.REQUEST,
            ),
          ],
        },
      ],
    },
  ],
});
