import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import {
  connectionInput,
  resourceAttributes,
  resourceData,
  resourceId,
  resourceType,
  syncToken,
} from "../../inputs";

export const updateResource = action({
  display: {
    label: "Update Resource",
    description: "Update a resource in QuickBooks.",
  },
  perform: async (
    context,
    {
      resourceAttributes,
      resourceType,
      syncToken,
      resourceId,
      resourceData,
      quickbooksConnection,
    },
  ) => {
    const client = createHttpClient(
      quickbooksConnection,
      context.debug.enabled,
    );
    const existingData = resourceData as Record<string, unknown>;
    const data = { ...existingData, ...resourceAttributes };
    data.SyncToken = syncToken;
    data.Id = resourceId;

    const response = await client.post(
      `/${resourceType.toLowerCase()}/`,
      resourceAttributes,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return {
      data: response.data,
    };
  },
  inputs: {
    quickbooksConnection: connectionInput,
    resourceAttributes,
    resourceType,
    syncToken,
    resourceId,
    resourceData,
  },
});
