import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { getDriveItemExamplePayload } from "../../examplePayloads";
import { getItemInputs } from "../../inputs";

export const getItem = action({
  display: {
    label: "Get Item by Path",
    description:
      "Get the information and metadata of an item with your path in Sharepoint",
  },
  inputs: getItemInputs,
  perform: async (context, { connection, dir }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return {
      data: await handleErrors(client.get(`/me/drive/root:${dir}`)),
    };
  },
  examplePayload: getDriveItemExamplePayload,
});
