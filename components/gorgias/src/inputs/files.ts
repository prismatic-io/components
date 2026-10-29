import { input, util } from "@prismatic-io/spectral";
import { toStr } from "../utils/toStr";
import { sharedInputs } from "./shared";

export const postApiUploadInputs = {
  type: input({
    label: "Type",
    type: "string",
    required: false,
    comments:
      "The type of file to upload. If not specified, the file will be uploaded as a private attachment.",
    model: [
      { value: "attachment", label: "Attachment" },
      { value: "public_attachment", label: "Public Attachment" },
      { value: "profile_picture", label: "Profile Picture" },
      { value: "widget_picture", label: "Widget Picture" },
    ],
    example: "attachment",
    placeholder: "attachment",
    clean: toStr,
  }),
  file: input({
    label: "File",
    type: "data",
    required: true,
    example: Buffer.from("Hello, World!").toString("base64"),
    comments:
      "A file to upload, this should be a reference to binary data from a previous step. The name of this parameter can be replaced with the label of the file you want to have once uploaded. E.g: package-damaged.png.",
    clean: util.types.toData,
  }),
  ...sharedInputs,
};

export const downloadFileInputs = {
  file_type: input({
    label: "File Type",
    type: "string",
    required: true,
    comments: "The type of file to download.",
    model: postApiUploadInputs.type.model,
    clean: toStr,
    placeholder: "attachment",
    example: "attachment",
  }),
  domain_hash: input({
    label: "Domain Hash",
    type: "string",
    required: true,
    comments: "The domain identifier of the account that owns the resource.",
    clean: toStr,
    placeholder: "Hna8kldnmlal",
    example: "Hna8kldnmlal",
  }),
  resource_name: input({
    label: "Resource Name",
    type: "string",
    required: true,
    comments:
      "The resource identifier of the attachment you are trying to retrieve.",
    clean: toStr,
    placeholder: "image-test-c9f158fc-062d-4b00-a826-e29b36852c9b.png",
    example: "image-test-c9f158fc-062d-4b00-a826-e29b36852c9b.png",
  }),
  ...sharedInputs,
};
