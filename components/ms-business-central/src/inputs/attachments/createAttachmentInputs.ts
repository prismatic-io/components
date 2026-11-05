import { input, util } from "@prismatic-io/spectral";
import { ATTACHMENT_PARENT_TYPES } from "../../constants";

export const parentId = input({
  label: "Parent ID",
  example: "0a077d18-45e3-ea11-bb43-000d3a2feca1",
  placeholder: "Enter parent ID",
  comments: "The ID of the parent object that the attachment is associated with",
  type: "string",
  required: true,
  clean: util.types.toString,
});

export const fileName = input({
  label: "File Name",
  example: "example.pdf",
  placeholder: "Enter file name",
  comments: "The name of the file",
  type: "string",
  required: true,
  clean: util.types.toString,
});

export const parentType = input({
  label: "Parent Type",
  example: "contact",
  placeholder: "Select parent type",
  comments: "The type of the parent object",
  type: "string",
  required: true,
  model: ATTACHMENT_PARENT_TYPES.map((type) => ({ label: type, value: type })),
  clean: util.types.toString,
});
