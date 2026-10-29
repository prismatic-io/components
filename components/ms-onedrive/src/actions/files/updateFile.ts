import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { updateFileExamplePayload } from "../../examplePayloads";
import { updateFileInputs } from "../../inputs";

export const updateFile = action({
  display: {
    label: "Update File",
    description: "Update the information and metadata of a given file",
  },
  inputs: updateFileInputs,
  perform: async (context, { connection, dir, values, fileName, path }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);

    return {
      data: await handleErrors(
        client.patch(`/me/drive/root:${dir}`, {
          ...values,
          ...(fileName ? { name: fileName } : {}),
          ...(path ? { parentReference: { path } } : {}),
        }),
      ),
    };
  },
  examplePayload: updateFileExamplePayload,
});
