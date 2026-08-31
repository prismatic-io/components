import { action, outputSchema, util } from "@prismatic-io/spectral";
import { FILE_TYPE } from "../../constants";
import { createAuthorizedClient } from "../../client";
import { getFileDownloadUrlExamplePayload } from "../../examplePayloads";
import { getFileDownloadUrlInputs } from "../../inputs";
import { getFileDownloadUrlOutputSchema } from "../../outputSchemas";
import { getPathEntries } from "../../util";
export const getFileDownloadUrl = action({
  display: {
    label: "Get File Download URL",
    description: "Get a URL to download the file at the specified path.",
  },
  performSafety: "notAllowed",
  perform: async (context, { path, boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const pathEntries = await getPathEntries(client, util.types.toString(path));
    const { id, type, name } = pathEntries.slice(-1)[0];
    if (type !== FILE_TYPE) {
      throw Error(`'${name}' is not a file`);
    }
    const url = await client.downloads.getDownloadFileUrl(
      util.types.toString(id),
    );
    return {
      data: url,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: getFileDownloadUrlExamplePayload.data,
  }),
  inputs: getFileDownloadUrlInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getFileDownloadUrlOutputSchema,
  }),
  examplePayload: getFileDownloadUrlExamplePayload,
});
