import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { createTemplateExample, updateTemplateExample } from "./examples";

export const templateQuery = input({
  label: "Query",
  type: "string",
  required: false,
  example: "Template Name 1",
  placeholder: "Enter a template name or description",
  comments: "The template name or description to search for.",
  clean: toOptionalString,
});

export const templateType = input({
  label: "Template Type",
  type: "string",
  required: false,
  example: "status_update",
  placeholder: "Enter a template type",
  comments: "The template type used to filter results.",
  clean: toOptionalString,
});

export const templateSortBy = input({
  label: "Sort By",
  type: "string",
  required: false,
  default: "created_at:asc",
  model: [
    { label: "Name", value: "name" },
    { label: "Name Asc", value: "name:asc" },
    { label: "Name Desc", value: "name:desc" },
    { label: "Created At", value: "created_at" },
    { label: "Created At Asc", value: "created_at:asc" },
    { label: "Created At Desc", value: "created_at:desc" },
  ],
  comments:
    "The field and direction used to sort results. Field options: name, created_at. Direction: asc or desc.",
  clean: toOptionalString,
});

export const templateId = input({
  label: "Template ID",
  type: "string",
  required: true,
  placeholder: "Enter a template ID",
  example: "PBZUP2B",
  comments: "The unique identifier for the template.",
  clean: util.types.toString,
});

export const createTemplateObject = input({
  label: "Template Object",
  type: "code",
  language: "json",
  example: createTemplateExample,
  comments: "The JSON object body describing the template to create.",
  required: true,
  clean: util.types.toObject,
});

export const updateTemplateObject = input({
  label: "Template",
  comments: "The JSON object body describing the template to update.",
  required: true,
  type: "code",
  language: "json",
  example: updateTemplateExample,
  clean: util.types.toObject,
});

export const updateMessage = input({
  label: "Update Message",
  type: "string",
  required: false,
  placeholder: "Enter a status update message",
  example: "Status update message",
  clean: (value: unknown) => {
    const parsedValue = toOptionalString(value);
    if (parsedValue) {
      return {
        status_update: parsedValue,
      };
    }

    return undefined;
  },
  comments:
    "An optional status update message sent along with the rendered template.",
});
