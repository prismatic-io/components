import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { path, connectionInput } from "../inputs";
import { getPathEntries } from "../utils";
import { getFileDownloadUrlExamplePayload } from "../examplePayloads";

export const getFileDownloadUrl = action({
  display: {
    label: "Get File Download URL",
    description: "Get a URL to download the file at the specified path",
  },
  perform: async (context, { path, boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const pathEntries = await getPathEntries(client, util.types.toString(path));
    const { id, type, name } = pathEntries.slice(-1)[0];

    if (type !== "file") {
      throw Error(`'${name}' is not a file`);
    }

    const url = await client.files.getDownloadURL(id);

    return {
      data: url,
    };
  },
  inputs: { path, boxConnection: connectionInput },
  examplePayload: getFileDownloadUrlExamplePayload,
});
