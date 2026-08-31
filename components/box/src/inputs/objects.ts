import { input, util } from "@prismatic-io/spectral";
import { connectionInput, path } from "./common";
export const fromPath = input({
  label: "From Path",
  placeholder: "Enter source path",
  type: "string",
  required: true,
  comments:
    "The full path to the source file or folder. Must include a leading forward slash (/).",
  example: "/Marketing/Documents/OldReport.pdf",
  clean: util.types.toString,
});
export const toPath = input({
  label: "To Path",
  placeholder: "Enter destination path",
  type: "string",
  required: true,
  comments:
    "The full path to the destination location including the new filename. Must include a leading forward slash (/).",
  example: "/Archive/2024/OldReport.pdf",
  clean: util.types.toString,
});
export const copyObjectInputs = {
  fromPath,
  toPath,
  boxConnection: connectionInput,
};
export const moveObjectInputs = {
  fromPath,
  toPath,
  boxConnection: connectionInput,
};
export const deleteObjectInputs = {
  path,
  boxConnection: connectionInput,
};
export const pathDetailsInputs = {
  path,
  boxConnection: connectionInput,
};
