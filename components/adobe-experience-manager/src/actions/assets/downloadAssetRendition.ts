import { action } from "@prismatic-io/spectral";
import { createAemDownloadClient } from "../../client";
import { ASSETS_API_PATH } from "../../constants";
import { downloadAssetRenditionExamplePayload } from "../../examplePayloads";
import { downloadAssetRenditionInputs } from "../../inputs";
import { toDownloadedFile } from "../../utils";

export const downloadAssetRendition = action({
  display: {
    label: "Download Asset Rendition",
    description: "Download a rendition of an asset, such as a web-optimized image or text version.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, assetId, renditionName, seoName }) => {
    const client = createAemDownloadClient(connection, context.debug.enabled);
    const response = await client.get(
      `${ASSETS_API_PATH}/${encodeURIComponent(assetId)}/renditions/${encodeURIComponent(renditionName)}/as/${encodeURIComponent(seoName)}`,
    );
    return toDownloadedFile(response);
  },
  inputs: downloadAssetRenditionInputs,
  examplePerform: async () => downloadAssetRenditionExamplePayload,
  examplePayload: downloadAssetRenditionExamplePayload,
});
