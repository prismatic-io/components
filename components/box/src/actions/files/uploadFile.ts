import { Readable } from "node:stream";
import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { FOLDER_TYPE } from "../../constants";
import { uploadFileExamplePayload } from "../../examplePayloads";
import { uploadFileInputs } from "../../inputs";
import { uploadFileOutputSchema } from "../../outputSchemas";
import { getPathEntries, pathLeafName } from "../../util";
export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Upload a file to the specified path.",
  },
  performSafety: "notAllowed",
  perform: async (context, { path, fileContents, boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const pathEntries = await getPathEntries(
      client,
      util.types.toString(path),
      false,
    );
    const { id, type, name } = pathEntries.slice(-2)[0];
    const { name: fileName } = pathEntries.slice(-1)[0];
    if (type !== FOLDER_TYPE) {
      throw Error(`'${name}' is not a folder`);
    }
    const { data } = util.types.toData(fileContents);
    const result = await client.uploads.uploadFile({
      attributes: {
        name: util.types.toString(fileName),
        parent: { id: util.types.toString(id) },
      },
      file: Readable.from(data),
    });
    return {
      data: result.rawData,
    };
  },
  examplePerform: async (
    _context,
    { path },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...uploadFileExamplePayload.data,
      entries: [
        {
          ...uploadFileExamplePayload.data.entries[0],
          name: pathLeafName(path),
        },
      ],
    },
  }),
  inputs: uploadFileInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: uploadFileOutputSchema,
  }),
  examplePayload: uploadFileExamplePayload,
});
