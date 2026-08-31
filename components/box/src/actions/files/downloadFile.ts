import { action, util } from "@prismatic-io/spectral";
import { FILE_TYPE } from "../../constants";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { downloadFileExamplePayload } from "../../examplePayloads";
import { downloadFileInputs } from "../../inputs";
import { getPathEntries } from "../../util";
export const downloadFile = action({
  display: {
    label: "Download File",
    description: "Download the file at the specified path.",
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
    const {
      data,
      headers: { "content-type": contentType },
    } = await createClient({
      baseUrl: url,
      responseType: "arraybuffer",
    }).get("");
    return {
      data,
      contentType: util.types.toString(contentType),
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: downloadFileExamplePayload.data,
  }),
  inputs: downloadFileInputs,
  examplePayload: downloadFileExamplePayload,
});
