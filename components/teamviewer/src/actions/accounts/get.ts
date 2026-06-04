import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { defaultInputs } from "../../inputs/general";
import { getAccountExamplePayload } from "../../examplePayloads/account";

export const getAccount = action({
  display: {
    label: "Get Account",
    description:
      "Returns the account that is associated with the used API token.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get("/account");

    return {
      data,
    };
  },
  inputs: defaultInputs,
  examplePayload: getAccountExamplePayload,
});
