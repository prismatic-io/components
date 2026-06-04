import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserFactorsExamplePayload } from "../../examplePayloads/users";
import { listUserFactorsInputs } from "../../inputs/users";
import type { Factor } from "../../interfaces/user";

export const listUserFactors = action({
  display: {
    label: "List User Factors",
    description:
      "Lists all enrolled factors for the specified user that are included in the highest priority authenticator enrollment policy that applies to the user.",
  },
  inputs: listUserFactorsInputs,
  perform: async (context, { connection, userId }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get<Factor[]>(`/users/${encodeURIComponent(userId)}/factors`);

    return { data };
  },
  examplePayload: getUserFactorsExamplePayload,
});
