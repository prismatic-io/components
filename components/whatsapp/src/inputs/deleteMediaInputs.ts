import { input, util } from "@prismatic-io/spectral";
import { connection } from "./general";

const mediaId = input({
  label: "Media ID",
  comments: "The ID of the media file to delete.",
  type: "string",
  required: true,
  example: "1234567890123456",
  placeholder: "Enter a Media ID",
  clean: util.types.toString,
});

export const deleteMediaInputs = { connection, mediaId };
