import { action } from "@prismatic-io/spectral";
import { deleteCompanyUserInputs } from "../../inputs/users";
import { createClient } from "../../client";
import { NO_CONTENT_RESPONSE } from "../../constants";

export const deleteUserCompany = action({
  display: {
    label: "Delete User Company",
    description:
      "Deletes the company of account (user) that is associated " +
      "with the used API token. This account should be the last user with " +
      "admin rights at the company.",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete("/users");

    return {
      data: NO_CONTENT_RESPONSE,
    };
  },
  inputs: deleteCompanyUserInputs,
  examplePayload: { data: NO_CONTENT_RESPONSE },
});
