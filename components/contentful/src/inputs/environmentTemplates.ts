import { input, util } from "@prismatic-io/spectral";
import {
  CONTENT_TYPE_TEMPLATES_DEFAULT,
  EDITOR_INTERFACE_TEMPLATES_DEFAULT,
} from "../constants";
import { cleanCodeInput } from "../util";
import { connection, environmentId, organizationId, spaceId } from "./common";



const templateName = input({
  label: "Name",
  type: "string",
  comments: "The identifier name for the template.",
  example: "my-template",
  placeholder: "Enter template name",
  required: true,
  clean: util.types.toString,
});

const templateDescription = input({
  label: "Description",
  type: "string",
  comments:
    "A brief explanation of what this template contains and its intended use case.",
  example: "My Template",
  placeholder: "Enter template description",
  required: true,
  clean: util.types.toString,
});

const templateVersionName = input({
  label: "Version Name",
  type: "string",
  comments: "The name identifier for this version of the template.",
  example: "First Version",
  placeholder: "Enter version name",
  required: true,
  clean: util.types.toString,
});

const templateVersionDescription = input({
  label: "Version Description",
  type: "string",
  comments:
    "A summary of the changes, improvements, or new features included in this version of the template.",
  example: "Initial release with blog post content type",
  placeholder: "Enter version description",
  required: true,
  clean: util.types.toString,
});

const contentTypeTemplates = input({
  label: "Content Type Templates",
  type: "code",
  language: "json",
  comments:
    "The content type definitions included in this template as a JSON array.",
  placeholder: "Enter content type templates JSON",
  default: JSON.stringify(CONTENT_TYPE_TEMPLATES_DEFAULT, null, 2),
  required: true,
  clean: cleanCodeInput,
});

const editorInterfaceTemplates = input({
  label: "Editor Interface Templates",
  type: "code",
  language: "json",
  comments:
    "The editor interface configurations included in this template as a JSON array.",
  placeholder: "Enter editor interface templates JSON",
  default: JSON.stringify(EDITOR_INTERFACE_TEMPLATES_DEFAULT, null, 2),
  required: true,
  clean: cleanCodeInput,
});

const templateId = input({
  label: "Template ID",
  type: "string",
  comments: "The unique identifier for the template.",
  example: "46SummRPRBowauM8T5LjbR",
  placeholder: "Enter template ID",
  required: true,
  clean: util.types.toString,
  dataSource: "selectEnvironmentTemplate",
});



export const createEnvironmentTemplateInputs = {
  connection,
  organizationId,
  name: templateName,
  description: templateDescription,
  versionName: templateVersionName,
  versionDescription: templateVersionDescription,
  contentTypeTemplates,
  editorInterfaceTemplates,
};



export const deleteEnvironmentTemplateInputs = {
  connection,
  organizationId,
  templateId,
};



export const getEnvironmentTemplateInputs = {
  connection,
  organizationId,
  templateId,
};



export const installTemplateInputs = {
  connection,
  spaceId,
  environmentId,
  templateId,
};



export const listEnvironmentTemplatesInputs = {
  connection,
  organizationId,
};



export const updateEnvironmentTemplateInputs = {
  connection,
  organizationId,
  templateId,
  name: {
    ...templateName,
    comments: "The updated name for the template.",
  },
  description: {
    ...templateDescription,
    comments: "The updated description for the template.",
  },
  versionName: {
    ...templateVersionName,
    comments: "The updated name for the version.",
  },
  versionDescription: {
    ...templateVersionDescription,
    comments: "The updated description for the version.",
  },
  contentTypeTemplates: {
    ...contentTypeTemplates,
    comments: "The updated content type definitions included in this template.",
  },
  editorInterfaceTemplates: {
    ...editorInterfaceTemplates,
    comments:
      "The updated editor interface configurations included in this template.",
  },
};
