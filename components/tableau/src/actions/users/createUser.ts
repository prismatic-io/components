import { action, util } from "@prismatic-io/spectral";
import { createUserExamplePayload } from "../../examplePayloads";
import { createUserInputs } from "../../inputs";
import { getTableauClient } from "../../util";
export const createUser = action({
  display: {
    label: "Create User",
    description: "Create a new user in a Tableau site.",
  },
  examplePayload: createUserExamplePayload,
  perform: async (context, params) => {
    const client = await getTableauClient({
      tableauConnection: params.tableauConnection,
      timeout: util.types.toInt(params.timeout),
      debug: context.debug.enabled,
    });
    const response = await client.post("/users", {
      user: {
        name: params.username,
        siteRole: params.siteRole,
        authSetting: params.authSetting,
      },
    });
    return {
      data: response.data,
    };
  },
  inputs: createUserInputs,
});
