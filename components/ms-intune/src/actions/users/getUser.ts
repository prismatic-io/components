import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { getUserExamplePayload } from "../../examplePayloads";
import { getUserInputs } from "../../inputs";
export const getUser = action({
  display: {
    label: "Get User",
    description: "Read properties and relationships of the User object.",
  },
  perform: async (context, { connection, userId, $select }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = { $select };
    const { data } = await client.get(`${ENDPOINTS.USERS}/${userId}`, {
      params,
    });
    return {
      data,
    };
  },
  inputs: getUserInputs,
  examplePayload: getUserExamplePayload,
});
