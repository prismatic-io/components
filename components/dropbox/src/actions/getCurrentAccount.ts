import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../auth";
import { getCurrentAccountExamplePayload } from "../example-payloads";
import { connectionInput } from "../inputs";
import { handleDropboxError } from "../util";

export const getCurrentAccount = action({
  display: {
    label: "Get Current Account",
    description: "Get information about the currently authenticated user",
  },
  perform: async (_context, { dropboxConnection }) => {
    const dbx = createAuthorizedClient(dropboxConnection);
    try {
      const { result } = await dbx.usersGetCurrentAccount();
      return { data: result };
    } catch (err) {
      handleDropboxError(err);
    }
  },
  inputs: { dropboxConnection: connectionInput },
  examplePayload: {
    data: getCurrentAccountExamplePayload,
  },
});
