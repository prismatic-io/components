import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getConfigurationItemResponse } from "../../examplePayloads";
import { ciId, ciTypeApiName, connectionInput } from "../../inputs";

export const getConfigurationItem = action({
  display: {
    label: "Get Configuration Item",
    description: "Retrieve a single configuration item on the CMDB",
  },
  inputs: {
    ciTypeApiName,
    ciId,
    connectionInput,
  },
  perform: async (context, { connectionInput, ciTypeApiName, ciId }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.get(`/cmdb/${ciTypeApiName}/${ciId}`);
    return { data };
  },
  examplePayload: {
    data: getConfigurationItemResponse,
  },
});
