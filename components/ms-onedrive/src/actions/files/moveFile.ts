import { action, outputSchema } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { moveFileExamplePayload } from "../../examplePayloads";
import { moveFileInputs } from "../../inputs";
import { moveFileOutputSchema } from "../../outputSchemas";
import { driveRootPath } from "../../util";

export const moveFile = action({
  display: {
    label: "Move File",
    description: "Moves the given file to a new location.",
  },
  inputs: moveFileInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, dir, path, fileName }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);

    return {
      data: await handleErrors(
        client.patch(`/me/drive/root:${dir}`, {
          parentReference: {
            path: driveRootPath(path),
          },
          name: fileName,
        }),
      ),
    };
  },
  examplePerform: async (_context, { path, fileName }) => ({
    data: {
      ...moveFileExamplePayload.data,
      name: fileName,
      parentReference: {
        ...moveFileExamplePayload.data.parentReference,
        path: driveRootPath(path),
      },
    },
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: moveFileOutputSchema,
  }),
  examplePayload: moveFileExamplePayload,
});
