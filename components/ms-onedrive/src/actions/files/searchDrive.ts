import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { searchDriveExamplePayload } from "../../examplePayloads";
import { searchDriveInputs } from "../../inputs";

export const searchDrive = action({
  display: {
    label: "Search Drive",
    description: "Search the current drive for a string of text",
  },
  perform: async (context, { connection, search }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return {
      data: await handleErrors(
        client.get(`/me/drive/root/search(q='${search}')`),
      ),
    };
  },
  inputs: searchDriveInputs,
  examplePayload: searchDriveExamplePayload,
});
