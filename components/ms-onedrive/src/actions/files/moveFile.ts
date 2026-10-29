import { action } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { moveFileExamplePayload } from "../../examplePayloads";
import { moveFileInputs } from "../../inputs";

export const moveFile = action({
  display: {
    label: "Move File",
    description: "Move the given file to a new location",
  },
  inputs: moveFileInputs,
  perform: async (context, { connection, dir, path, fileName }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);

    return {
      data: await handleErrors(
        client.patch(`/me/drive/root:${dir}`, {
          parentReference: {
            path: `/drive/root:${path}`,
          },
          name: fileName,
        }),
      ),
    };
  },
  examplePayload: moveFileExamplePayload,
});
