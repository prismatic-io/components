import { input, util } from "@prismatic-io/spectral";
import { connection } from "./general";

const phoneNumberId = input({
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

export const uploadMediaInputs = {
  connection,
  phoneNumberId,
  file,
  filename,
};
