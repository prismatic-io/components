import { action, outputSchema } from "@prismatic-io/spectral";
import { customObjectSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { getCustomObjectExamplePayload } from "../../examplePayloads";
import { getCustomObjectInputs } from "../../inputs";
import { hubspotPaths } from "../../constants";

export const getCustomObject = action({
  display: {
    label: "Get Custom Object",
    description: "Retrieves a specific custom object.",
  },
  performSafety: "safe",
  perform: async (context, { hubspotConnection, timeout, objectType }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const { data } = await client.get(hubspotPaths.schemas(`/${objectType}`));

    return {
      data,
    };
  },
  inputs: getCustomObjectInputs,
  examplePayload: getCustomObjectExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: customObjectSchema,
  }),
});
