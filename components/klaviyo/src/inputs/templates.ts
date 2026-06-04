import { input } from "@prismatic-io/spectral";
import { FIELDS_TEMPLATE_MODEL } from "../constants";
import { cleanStringInput } from "../utils";
import { connection, fields } from "./shared";

const fieldsTemplate = input({ ...fields, model: FIELDS_TEMPLATE_MODEL });

export const listTemplatesInputs = {
  connection,
  fieldsTemplate,
};

const templateName = input({
  label: "Template Name",
  comments: "The name of the template.",
  type: "string",
  example: "Monthly Newsletter Template",
  placeholder: "Monthly Newsletter Template",
  required: true,
  clean: cleanStringInput,
});

const templateHtml = input({
  label: "Template HTML",
  comments: "The HTML content of the template.",
  type: "string",
  example: "<html><body><p>Hello, world!</p></body></html>",
  placeholder: "<html><body><p>Hello, world!</p></body></html>",
  required: false,
  clean: cleanStringInput,
});

const templateText = input({
  label: "Template Text",
  comments: "The text content of the template.",
  type: "string",
  example: "Hello, world!",
  placeholder: "Hello, world!",
  required: false,
  clean: cleanStringInput,
});

const editorType = input({
  label: "Editor Type",
  comments: "Restricted to CODE.",
  type: "string",
  example: "CODE",
  placeholder: "CODE",
  required: true,
  clean: cleanStringInput,
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
  comments: "The ID of the template.",
  type: "string",
  example: "123456",
  placeholder: "123456",
  required: true,
  dataSource: "selectTemplate",
  clean: cleanStringInput,
});

export const getTemplateInputs = {
  connection,
  templateId,
  fieldsTemplate,
};

export const updateTemplateInputs = {
  connection,
  templateId,
  templateName: { ...templateName, required: false },
  templateHtml,
  templateText,
};

export const deleteTemplateInputs = {
  connection,
  templateId,
};
