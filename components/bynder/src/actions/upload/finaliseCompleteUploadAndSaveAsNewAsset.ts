import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { finaliseCompleteUploadAndSaveAsNewAssetResponse } from "../../examplePayloads";
import { chunks, connection, id, name, targetid } from "../../inputs";

export const finaliseCompleteUploadAndSaveAsNewAsset = action({
  display: {
    label: "Finalize Complete Upload And Save As New Asset Additional",
    description:
      "Finalize a completely uploaded file and save as a new asset additional.",
  },
  inputs: {
    assetId: {
      ...id,
      label: "Asset ID",
      comments: "Asset id to which to save the new additional.",
      dataSource: "selectAsset",
    },
    uploadId: {
      ...id,
      label: "ID",
      comments: "ID of the upload.",
      required: true,
      example:
        "T3.fS5.5HPhtYFtm2b_.e7wVe910tL5XQutKw1jkMqlP5cPQVyZkOZxZ9lJiGUk4FIw6M0CFZ3xogTWrm.GPI2p2CaglQcAS5aH37zT_vHJnbtkebYbheXIQc_.M_6hM",
      placeholder:
        "T3.fS5.5HPhtYFtm2b_.e7wVe910tL5XQutKw1jkMqlP5cPQVyZkOZxZ9lJiGUk4FIw6M0CFZ3xogTWrm.GPI2p2CaglQcAS5aH37zT_vHJnbtkebYbheXIQc_.M_6hM",
    },
    targetid,
    s3Filename: {
      ...name,
      label: "S3 Filename",
      comments:
        "Base location of the uploaded file or filename result from the last upload chunk action.",
      example:
        "api_uploads/159D8D4B-B981-49B8-BF0569FD144CB359/A29FABF0-26B8-44BF-890920E4C09E7C11/Logo.png/p{chunks}",
      placeholder:
        "api_uploads/159D8D4B-B981-49B8-BF0569FD144CB359/A29FABF0-26B8-44BF-890920E4C09E7C11/Logo.png/p{chunks}",
      required: true,
    },
    chunks: {
      ...chunks,
      comments: "Total number of chunks uploaded.",
    },
    connection,
  },
  perform: async (
    context,
    { connection, targetid, chunks, s3Filename, assetId, uploadId },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/media/${assetId}/save/additional/${uploadId}`,
      {
        targetid,
        chunks,
        s3_filename: s3Filename,
      },
    );
    return { data };
  },
  examplePayload: {
    data: finaliseCompleteUploadAndSaveAsNewAssetResponse,
  },
});
