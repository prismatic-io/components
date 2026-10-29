import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import { connection } from "./common";

const getMediaMediaId = input({
  label: "Media ID",
  comments: "The ID of the media to retrieve.",
  type: "string",
  required: true,
  placeholder: "Enter a Media ID",
  example: "1234567890123456",
  clean: util.types.toString,
});

const getMediaPhoneNumberId = input({
  label: "Phone Number ID",
  comments:
    "Business phone number ID. The operation will proceed only if it matches the ID used to upload the media.",
  type: "string",
  required: false,
  placeholder: "Enter a Phone Number ID",
  example: "912345678912345",
  clean: cleanStringInput,
});

const url = input({
  label: "URL",
  comments: "The URL returned by the Get Media action to download media from.",
  type: "string",
  placeholder: "Enter a media URL",
  example:
    "https://lookaside.fbsbx.com/whatsapp_business/attachments/?mid=12345...",
  required: true,
  clean: util.types.toString,
});

const deleteMediaMediaId = input({
  label: "Media ID",
  comments: "The ID of the media file to delete.",
  type: "string",
  required: true,
  example: "1234567890123456",
  placeholder: "Enter a Media ID",
  clean: util.types.toString,
});

const uploadMediaPhoneNumberId = input({
  label: "Phone Number ID",
  comments: "The ID of the phone number to upload media to.",
  type: "string",
  required: true,
  example: "912345678912345",
  placeholder: "Enter a phone number ID",
  clean: util.types.toString,
});

const file = input({
  label: "File",
  comments:
    "The file to upload. This should be a file returned from an action that returns a file.",
  type: "data",
  required: true,
  clean: util.types.toData,
});

const filename = input({
  label: "Filename",
  comments: "The filename to use for the uploaded file.",
  type: "string",
  required: false,
  example: "example.jpg",
  placeholder: "Enter the filename",
  clean: util.types.toString,
});

export const getMediaInputs = {
  connection,
  mediaId: getMediaMediaId,
  phoneNumberId: getMediaPhoneNumberId,
};

export const getMediafromURLInputs = { connection, url };

export const deleteMediaInputs = { connection, mediaId: deleteMediaMediaId };

export const uploadMediaInputs = {
  connection,
  phoneNumberId: uploadMediaPhoneNumberId,
  file,
  filename,
};
