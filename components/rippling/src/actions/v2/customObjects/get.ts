import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { API_VERSION } from "../../../constants";
import { getCustomObjectExamplePayload } from "../../../examplePayloads";
import { getCustomObjectInputs } from "../../../inputs";

export const getCustomObject = action({
  display: {
    label: "Get Custom Object (V2)",
    description: "Retrieve a specific custom object by API name.",
  },
  inputs: getCustomObjectInputs,
  examplePayload: getCustomObjectExamplePayload,
  perform: async (context, { connection, customObjectApiName }) => {
    const client = createClient(
      connection,
      API_VERSION.V2,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/custom-objects/${customObjectApiName}/`,
    );
    return { data };
  },
});
