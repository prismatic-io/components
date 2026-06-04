import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { path, connectionInput } from "../inputs";
import { getPathEntries } from "../utils";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { downloadFileExamplePayload } from "../examplePayloads";

export const downloadFile = action({
  display: {
    label: "Download File",
    description: "Download the file at the specified path",
  },
  perform: async (context, { path, boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const pathEntries = await getPathEntries(client, util.types.toString(path));
    const { id, type, name } = pathEntries.slice(-1)[0];

    if (type !== "file") {
      throw Error(`'${name}' is not a file`);
    }

    const url = await client.files.getDownloadURL(id);
    const {
      data,
      headers: { "content-type": contentType },
    } = await createClient({
      baseUrl: url,
      responseType: "arraybuffer",
    }).get("");

    return {
      data,
      contentType,
    };
  },
  inputs: { path, boxConnection: connectionInput },
  examplePayload: downloadFileExamplePayload,
});
