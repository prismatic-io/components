import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { updateAccountInputs } from "../../inputs";
import type { UpdateAccountBody } from "../types/UpdateAccountBody";
import { updateAccountExamplePayload } from "../../examplePayloads";

export const updateAccount = action({
  display: {
    label: "Update Account",
    description:
      "Updates the specified account's metadata and type properties.",
  },
  examplePayload: updateAccountExamplePayload,
  perform: async (context, { connection, accountId, updateAccountBody }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const body = JSON.parse(updateAccountBody) as UpdateAccountBody;
    const { data } = await client.patch(`/accounts/${accountId}`, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return { data };
  },
  inputs: updateAccountInputs,
});

export default { updateAccount };
