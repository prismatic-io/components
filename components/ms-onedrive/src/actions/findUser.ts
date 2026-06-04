import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection, userId } from "../inputs";
import { handleErrors } from "../errors";
import { findUserExamplePayload } from "../examplePayloads";

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
  inputs: {
    connection: oneDriveConnection,
    userId,
  },
  examplePayload: findUserExamplePayload,
});
