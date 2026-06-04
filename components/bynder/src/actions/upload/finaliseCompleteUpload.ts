import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { finaliseCompleteUploadResponse } from "../../examplePayloads";
import { chunks, connection, id, name, targetid } from "../../inputs";

export const finaliseCompleteUpload = action({
  display: {
    label: "Finalize Complete Upload",
    description: "Finalize a completely uploaded file.",
  },
  inputs: {
    id: {
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
      comments: "Base location of the uploaded file.",
      example:
        "api_uploads/159D8D4B-B981-49B8-BF0569FD144CB359/A29FABF0-26B8-44BF-890920E4C09E7C11/Logo.png",
      placeholder:
        "api_uploads/159D8D4B-B981-49B8-BF0569FD144CB359/A29FABF0-26B8-44BF-890920E4C09E7C11/Logo.png",
      required: true,
    },
    chunks: {
      ...chunks,
      comments: "Total number of chunks uploaded.",
    },
    originalFilename: {
      ...name,
      label: "Original Filename",
      comments:
        "Filename including special characters to be displayed in Bynder.",
      example: "Logo.png",
      placeholder: "Logo.png",
    },
    connection,
  },
  perform: async (
    context,
    { connection, id, targetid, chunks, originalFilename, s3Filename },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/upload/${id}`, {
      targetid,
      chunks,
      original_filename: originalFilename,
      s3_filename: s3Filename,
    });
    return { data };
  },
  examplePayload: {
    data: finaliseCompleteUploadResponse,
  },
});
