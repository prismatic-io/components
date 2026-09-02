import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { listCustomObjectsExamplePayload } from "../../examplePayloads";
import { listCustomObjectsInputs } from "../../inputs";
import { getProps } from "../../util";
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
    const { data } = await client.get("/crm/v3/schemas", {
      params: {
        ...parameterizedProperties,
        archived: archived,
      },
    });
    return { data };
  },
  inputs: listCustomObjectsInputs,
  examplePayload: listCustomObjectsExamplePayload,
});
