import { input, util } from "@prismatic-io/spectral";
import { connection } from "./general";
import { cleanStringInput } from "../utils";

const mediaId = input({
  label: "Media ID",
  comments: "The ID of the media to retrieve.",
  type: "string",
  required: true,
  placeholder: "Enter a Media ID",
  example: "1234567890123456",
  clean: util.types.toString,
});

const phoneNumberId = input({
  label: "Phone Number ID",
  comments:
    "Business phone number ID. The operation will proceed only if it matches the ID used to upload the media.",
  type: "string",
  required: false,
  placeholder: "Enter a Phone Number ID",
  example: "912345678912345",
  clean: cleanStringInput,
});

export const getMediaInputs = {
  connection,
  mediaId,
  phoneNumberId,
};
