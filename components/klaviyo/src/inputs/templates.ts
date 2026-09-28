import { input, util } from "@prismatic-io/spectral";
import { FIELDS_TEMPLATE_MODEL } from "../constants";
import { cleanStringInput } from "../util";
import { connection, fields } from "./common";
const fieldsTemplate = input({ ...fields, model: FIELDS_TEMPLATE_MODEL });
export const listTemplatesInputs = {
  connection,
  fieldsTemplate,
};
const templateName = input({
  label: "Template Name",
  comments: "A display name to identify the template.",
  type: "string",
  example: "Monthly Newsletter Template",
  placeholder: "Enter a template name",
  required: true,
  clean: util.types.toString,
});
const templateHtml = input({
  label: "Template HTML",
  comments: "The HTML markup rendered to recipients.",
  type: "string",
  example: "<html><body><p>Hello, world!</p></body></html>",
  placeholder: "Enter HTML content",
  required: false,
  clean: cleanStringInput,
});
const templateText = input({
  label: "Template Text",
  comments: "The plain-text fallback shown when HTML cannot be rendered.",
  type: "string",
  example: "Hello, world!",
  placeholder: "Enter plain text content",
  required: false,
  clean: cleanStringInput,
});
const editorType = input({
  label: "Editor Type",
  comments:
    "The editor used to author the template. Currently only CODE is supported.",
  type: "string",
  example: "CODE",
  placeholder: "Enter an editor type",
  required: true,
  clean: util.types.toString,
});
export const createTemplateInputs = {
  connection,
  templateName,
  editorType,
  templateHtml,
  templateText,
};
const templateId = input({
  label: "Template ID",
  comments: "The unique identifier for the template.",
  type: "string",
  example: "123456",
  placeholder: "Enter a template ID",
  required: true,
  dataSource: "selectTemplate",
  clean: util.types.toString,
});
export const getTemplateInputs = {
  connection,
  templateId,
  fieldsTemplate,
};
export const updateTemplateInputs = {
  connection,
  templateId,
  templateName: { ...templateName, required: false, clean: cleanStringInput },
  templateHtml,
  templateText,
};
export const deleteTemplateInputs = {
  connection,
  templateId,
};
