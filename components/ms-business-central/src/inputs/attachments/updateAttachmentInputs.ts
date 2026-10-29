import { input, util } from "@prismatic-io/spectral";

export const attachmentId = input({
  label: "Attachment ID",
  comments: "The ID of the attachment to update.",
  type: "string",
  required: true,
  placeholder: "25b8238e-f034-ef11-840b-002248241214",
  example: "25b8238e-f034-ef11-840b-002248241214",
  clean: util.types.toString,
});

export const attachmentContent = input({
  label: "Attachment Content",
  comments: "The content of the attachment.",
  type: "string",
  placeholder: "<binary data>",
  example: "<binary data>",
  required: true,
  clean: util.types.toData,
});
