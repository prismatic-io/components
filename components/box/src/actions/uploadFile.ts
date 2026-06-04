import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { path, fileContents, connectionInput } from "../inputs";
import { getPathEntries } from "../utils";
import { uploadFileExamplePayload } from "../examplePayloads";

export const uploadFile = action({
  display: {
    label: "Upload File",
    description: "Upload a file to the specified path",
  },
  perform: async (context, { path, fileContents, boxConnection }) => {
    const client = createAuthorizedClient({ boxConnection });
    const pathEntries = await getPathEntries(
      client,
      util.types.toString(path),
      false,
    );
    const { id, type, name } = pathEntries.slice(-2)[0];
    const { name: fileName } = pathEntries.slice(-1)[0];

    if (type !== "folder") {
      throw Error(`'${name}' is not a folder`);
    }

    const { data } = util.types.toData(fileContents);
    const result = await client.files.uploadFile(id, fileName, data);
    return {
      data: result,
    };
  },
  inputs: { path, fileContents, boxConnection: connectionInput },
  examplePayload: uploadFileExamplePayload,
});
