import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../../util";

const detectedAppId = input({
  label: "Detected App Id",
  comments: "Unique Identifier for the detected app to retrieve.",
  example: "caf60db6-0db6-caf6-b60d-f6cab60df6ca",
  placeholder: "Enter detected app ID",
  type: "string",
  required: true,
  dataSource: "selectDetectedApp",
  clean: cleanStringInput,
});

export default {
  detectedAppId,
};
