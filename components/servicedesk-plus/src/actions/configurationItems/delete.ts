import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteResponse } from "../../examplePayloads";
import { ciIds, ciTypeApiName, connectionInput } from "../../inputs";

export const deleteConfigurationItem = action({
  display: {
    label: "Delete Configuration Item",
    description: "Delete an existing configuration item on the CMDB",
  },
  inputs: {
    ciTypeApiName,
    ciIds,
    connectionInput,
  },
  perform: async (context, { connectionInput, ciTypeApiName, ciIds }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.delete(`/cmdb/${ciTypeApiName}`, {
      params: {
        ids: ciIds?.toString(),
      },
    });
    return { data };
  },
  examplePayload: {
    data: deleteResponse,
  },
});
