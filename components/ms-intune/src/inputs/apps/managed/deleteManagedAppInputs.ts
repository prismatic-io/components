import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../../util";

const mobileAppId = input({
  label: "Mobile App ID",
  comments: "The ID of the app to delete.",
  placeholder: "Enter mobile app ID",
  example: "e0741df2-bae3-4649-9599-c47026da1234",
  type: "string",
  required: true,
  clean: cleanStringInput,
});

export default {
  mobileAppId,
};
