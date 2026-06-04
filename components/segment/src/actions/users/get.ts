import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, region, userId } from "../../inputs";
import { getUserExamplePayload } from "../../examplePayloads";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Returns a user given their id.",
  },
  inputs: {
    connectionInput,
    region,
    userId,
  },
  perform: async (context, { connectionInput, region, userId }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(`/users/${userId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getUserExamplePayload,
  },
});
