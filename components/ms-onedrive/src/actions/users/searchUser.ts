import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { findUserExamplePayload } from "../../examplePayloads";
import { searchUserInputs } from "../../inputs";

export const searchUser = action({
  display: {
    label: "Search Users",
    description: "Find the information and metadata of an existing user",
  },
  perform: async (context, { connection, userId }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);

    return {
      data: await handleErrors(client.get(`/users/${userId}`)),
    };
  },
  inputs: searchUserInputs,
  examplePayload: findUserExamplePayload,
});
