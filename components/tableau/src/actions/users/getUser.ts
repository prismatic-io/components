import { action, util } from "@prismatic-io/spectral";
import { getUserExamplePayload } from "../../examplePayloads";
import { getUserInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const getUser = action({
  display: {
    label: "Get User",
    description: "Retrieve an existing user by ID.",
  },
  examplePayload: getUserExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.get(`/users/${params.userId}`);
    return {
      data: response.data,
    };
  },
  inputs: getUserInputs,
});
