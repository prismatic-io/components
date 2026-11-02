import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { ASSETS_API_PATH } from "../../constants";
import { importAssetFromUrlExamplePayload } from "../../examplePayloads";
import { importAssetFromUrlInputs } from "../../inputs";
import { importJobOutputSchema } from "../../outputSchemas";
import type { ImportJob } from "../../types";

export const importAssetFromUrl = action({
  display: {
    label: "Import Asset from URL",
    description:
      "Create an asset by having AEM download a file from a URL. Runs as a job; check it with Get Import Job Status.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, folder, fileUrl, fileName, mimeType },
  ) => {
    const client = createAemClient(connection, context.debug.enabled);
    const { data } = await client.post<ImportJob>(
      `${ASSETS_API_PATH}/import/fromUrl`,
      {
        folder,
        files: [{ url: fileUrl, fileName, ...(mimeType ? { mimeType } : {}) }],
      },
    );
    return { data };
  },
  inputs: importAssetFromUrlInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: importJobOutputSchema,
  }),
  examplePerform: async () => importAssetFromUrlExamplePayload,
  examplePayload: importAssetFromUrlExamplePayload,
});
