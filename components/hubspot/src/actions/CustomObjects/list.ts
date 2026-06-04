import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { listCustomObjectsPayload } from "../../examplePayloads";
import { additionalProperties, archived, connectionInput, timeout } from "../../inputs";
import { getProps } from "../../util";

export const listCustomObjects = action({
  display: {
    label: "List Custom Objects",
    description: "Retrieve all custom objects",
  },
  perform: async (context, { hubspotConnection, timeout, archived, additionalProperties }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient({
      hubspotConnection,
      timeout,
      debugRequest,
    });

    const parameterizedProperties = getProps(["name"], additionalProperties || []);
    
    return {
      data: (
        await client.get("/crm/v3/schemas", {
          params: {
            ...parameterizedProperties,
            archived: archived || false,
          },
        })
      ).data,
    };
  },
  inputs: {
    hubspotConnection: connectionInput,
    timeout,
    archived: { ...archived, required: false },
    additionalProperties,
  },
  examplePayload: listCustomObjectsPayload,
});
