import { action } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { createAuthorizedClient } from "../../client";
import { saveFromUrlInputs } from "../../inputs";
import { saveFromUrlExamplePayload } from "../../examplePayloads";
export const saveFromUrl = action({
  display: {
    label: "Save From URL",
    description: "Save a file from a URL to Azure Files.",
  },
  perform: async (context, { azureConnection, shareName, sourceUrl, path }) => {
    const client = createAuthorizedClient(azureConnection);
    const shareClient = client.getShareClient(shareName);
    const response = await createClient({
      baseUrl: sourceUrl,
    }).get("", {
      responseType: "stream",
    });
    const fileSize = Number(response.headers["content-length"]);
    if (!fileSize) {
      throw new Error(
        "Source file server did not include a content-length header. Azure Files requires that the file size is known ahead of time.",
      );
    }
    const { fileClient, fileCreateResponse } = await shareClient.createFile(
      path,
      fileSize,
    );
    await fileClient.uploadStream(response.data, fileSize, 4 * 1024 * 1024, 4);
    return {
      data: fileCreateResponse,
    };
  },
  inputs: saveFromUrlInputs,
  examplePayload: saveFromUrlExamplePayload,
});
