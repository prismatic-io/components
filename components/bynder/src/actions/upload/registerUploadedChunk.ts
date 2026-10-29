import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { registerUploadedChunkResponse } from "../../examplePayloads";
import { chunk, connection, id, name, targetid } from "../../inputs";

export const registerUploadedChunk = action({
  display: {
    label: "Register Uploaded Chunk",
    description: "Register an uploaded chunk.",
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
    chunkNumber: {
      ...chunk,
      label: "Chunk Number",
      comments: "Number of the chunk that was uploaded.",
    },
    targetid,
    filename: {
      ...name,
      label: "Filename",
      comments: "Location of the uploaded chunk.",
      example:
        "api_uploads/00000000-0000-0000-0000000000000000/00000000-0000-0000-0000000000000000/Logo.png/p5",
      placeholder:
        "api_uploads/00000000-0000-0000-0000000000000000/00000000-0000-0000-0000000000000000/Logo.png/p5",
      required: true,
    },
    connection,
  },
  perform: async (
    context,
    { connection, filename, chunkNumber, targetid, id },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/upload`, {
      id,
      chunkNumber,
      targetid,
      filename,
    });
    return { data };
  },
  examplePayload: {
    data: registerUploadedChunkResponse,
  },
});
