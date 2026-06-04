import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { connectionInput, resourceId, resourceType } from "../../inputs";

export const findResource = action({
  display: {
    label: "Find Resource by ID",
    description: "Retrieve a resource by ID from QuickBooks.",
  },
  perform: async (
    context,
    { resourceId, resourceType, quickbooksConnection },
  ) => {
    const client = createHttpClient(
      quickbooksConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/${resourceType.toLowerCase()}/${resourceId}`,
    );
    return { data };
  },
  inputs: {
    quickbooksConnection: connectionInput,
    resourceType,
    resourceId,
  },
});
