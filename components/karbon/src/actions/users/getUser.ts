import { action } from "@prismatic-io/spectral";
import getUserInputs from "../../inputs/users/getUser";
import { createKarbonClient } from "../../client";
import { cleanOdata } from "../../utils";
import { getUserExamplePayload } from "../../examplePayloads";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Gets the details of a single User",
  },
  inputs: {
    ...getUserInputs,
  },
  perform: async (context, { connection, userId }) => {
    const client = createKarbonClient(connection, context.debug.enabled);
    const response = await client.get(`/v3/Users/${userId}`);
    return { data: cleanOdata(response.data) };
  },
  examplePayload: getUserExamplePayload,
});
