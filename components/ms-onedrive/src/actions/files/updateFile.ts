import { action, outputSchema } from "@prismatic-io/spectral";
import { getOneDriveClient } from "../../client";
import { handleErrors } from "../../errors";
import { updateFileExamplePayload } from "../../examplePayloads";
import { updateFileInputs } from "../../inputs";
import { updateFileOutputSchema } from "../../outputSchemas";
import { driveRootPath } from "../../util";

export const updateFile = action({
  display: {
    label: "Update File",
    description: "Updates the information and metadata of a given file.",
  },
  inputs: updateFileInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, dir, values, fileName, path }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    const parentPath = path ? driveRootPath(path) : undefined;

    return {
      data: await handleErrors(
        client.patch(`/me/drive/root:${dir}`, {
          ...values,
          ...(fileName ? { name: fileName } : {}),
          ...(parentPath ? { parentReference: { path: parentPath } } : {}),
        }),
      ),
    };
  },
  examplePerform: async (_context, { fileName, path }) => ({
    data: {
      ...updateFileExamplePayload.data,
      ...(fileName ? { name: fileName } : {}),
      ...(path
        ? {
            parentReference: {
              ...updateFileExamplePayload.data.parentReference,
              path: driveRootPath(path),
            },
          }
        : {}),
    },
  }),
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateFileOutputSchema,
  }),
  examplePayload: updateFileExamplePayload,
});
