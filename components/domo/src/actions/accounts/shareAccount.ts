import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { shareAccountInputs } from "../../inputs";
import { shareAccountExamplePayload } from "../../examplePayloads";

export const shareAccount = action({
  display: {
    label: "Share Account",
    description: "Shares an account with one or more users.",
  },
  examplePayload: shareAccountExamplePayload,
  perform: async (context, { connection, accountId, userArray }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    let queryParams = "?";
    for (let index = 0; index < userArray.length; index++) {
      const user = userArray[index];
      if (index > 0) {
        queryParams += `&user=${user}`;
      } else {
        queryParams += `user=${user}`;
      }
    }
    const { data } = await client.get(
      `/accounts/${accountId}/shares${queryParams}`,
    );
    return { data };
  },
  inputs: shareAccountInputs,
});

export default { shareAccount };
