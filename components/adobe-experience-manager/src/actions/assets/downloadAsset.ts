import { action } from "@prismatic-io/spectral";
import { createAemDownloadClient } from "../../client";
import { ASSETS_API_PATH } from "../../constants";
import { downloadAssetExamplePayload } from "../../examplePayloads";
import { downloadAssetInputs } from "../../inputs";
import { toDownloadedFile } from "../../utils";

export const downloadAsset = action({
  display: {
    label: "Download Asset",
    description: "Download the original binary of an asset.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, assetId, seoName }) => {
    const client = createAemDownloadClient(connection, context.debug.enabled);
    const response = await client.get(
      `${ASSETS_API_PATH}/${encodeURIComponent(assetId)}/original/as/${encodeURIComponent(seoName)}`,
    );
    return toDownloadedFile(response);
  },
  inputs: downloadAssetInputs,
  examplePerform: async () => downloadAssetExamplePayload,
  examplePayload: downloadAssetExamplePayload,
});
