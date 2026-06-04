import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../../util";

const appId = input({
  label: "App Id",
  comments:
    "The unique identifier of a managed app. You can get this from the 'List Managed Apps' action.",
  example: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
  placeholder: "Enter app ID",
  type: "string",
  required: true,
  clean: cleanStringInput,
});

export default {
  appId,
};
