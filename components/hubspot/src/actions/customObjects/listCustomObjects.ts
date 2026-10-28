import { action, outputSchema } from "@prismatic-io/spectral";
import { listCustomObjectsOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { listCustomObjectsExamplePayload } from "../../examplePayloads";
import { listCustomObjectsInputs } from "../../inputs";
import { getProps } from "../../util";
import { hubspotPaths } from "../../constants";
export const listCustomObjects = action({
  display: {
    label: "List Custom Objects",
    description: "Retrieve all custom objects.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { hubspotConnection, timeout, archived, additionalProperties },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });
    const parameterizedProperties = getProps(
      ["name"],
      additionalProperties || [],
    );
    const { data } = await client.get(hubspotPaths.schemas(), {
      params: {
        ...parameterizedProperties,
        archived: archived,
      },
    });
    return { data };
  },
  inputs: listCustomObjectsInputs,
  examplePayload: listCustomObjectsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCustomObjectsOutputSchema,
  }),
});
