import { action, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { getWebApiUrl } from "../../client";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { getCurrentUserInputs } from "../../inputs";

export const getCurrentUser = action({
  display: {
    label: "Get Current User",
    description: "Retrieves information about the currently logged-in CRM user.",
  },
  inputs: getCurrentUserInputs,
  perform: async (context, params) => {
    const webApiUrl = await getWebApiUrl(params.connection, context.debug.enabled);
    const token = util.types.toString(params.connection.token.access_token);
    const webClient = createClient({ baseUrl: webApiUrl, debug: context.debug.enabled });
    const { data } = await webClient.get(`/WhoAmI()`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  },
  examplePayload: getCurrentUserExamplePayload,
});
