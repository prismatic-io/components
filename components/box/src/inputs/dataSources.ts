import { input, util } from "@prismatic-io/spectral";
import { connectionInput, limit, marker, offset } from "./common";
export const contentType = input({
  label: "Content Type",
  placeholder: "Select content type",
  comments: "The type of content to select (files, folders, or both).",
  type: "string",
  example: "file",
  model: [
    { label: "Files and Folders", value: "all" },
    { label: "Files", value: "file" },
    { label: "Folders", value: "folder" },
  ],
  default: "all",
  required: true,
  clean: util.types.toString,
});
export const selectContentInputs = {
  boxConnection: connectionInput,
  contentType,
  limit,
  marker,
  offset,
};
export const selectWebhookInputs = {
  boxConnection: connectionInput,
};
