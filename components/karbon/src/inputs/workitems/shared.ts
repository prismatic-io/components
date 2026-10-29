import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../utils";

export const workItemkey = input({
  label: "Work Item Key",
  type: "string",
  comments: "The Work Item key",
  required: true,
  clean: cleanStringInput,
  example: "2LPSrkzbYrn4",
  placeholder: "2LPSrkzbYrn4",
  dataSource: "selectWorkItem",
});
