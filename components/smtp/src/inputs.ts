import { input } from "@prismatic-io/spectral";
import { cleanArrayCodeInput } from "./util";

export const multipleAttachments = input({
  label: "Multiple Attachments",
  type: "code",
  required: false,
  language: "json",
  example: JSON.stringify([
    {
      key: "filename",
      value: "<base64 encoded content>",
    },
  ]),
  comments: "Provide an array of attachments to send with the email.",
  clean: (code: unknown) => cleanArrayCodeInput(code, "Multiple Attachments"),
});
