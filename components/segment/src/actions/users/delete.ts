import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, region, userIds } from "../../inputs";
import { deleteExamplePayload } from "../../examplePayloads";

export const deleteUser = action({
  display: {
    label: "Delete Users",
    description: "Removes one or multiple users.",
  },
  inputs: {
    connectionInput,
    region,
    userIds,
  },
  perform: async (context, { connectionInput, region, userIds }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.delete(`/users`, {
      params: {
        userIds: userIds || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: deleteExamplePayload,
  },
});
