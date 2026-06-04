import { action, util } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../client";
import { oneDriveConnection, search } from "../inputs";
import { handleErrors } from "../errors";
import { searchDriveExamplePayload } from "../examplePayloads";

export const searchDrive = action({
  display: {
    label: "Search Drive",
    description: "Search the current drive for a string of text",
  },
  perform: async (context, { connection, search }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return {
      data: await handleErrors(
        client.get(`/me/drive/root/search(q='${util.types.toString(search)}')`),
      ),
    };
  },
  inputs: {
    connection: oneDriveConnection,
    search,
  },
  examplePayload: searchDriveExamplePayload,
});
