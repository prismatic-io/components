import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

export const fieldId = input({
  label: "Field ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the employee field.",
  example: "custom_field_123",
  dataSource: "selectEmployeeField",
  placeholder: "Enter field ID",
  clean: util.types.toString,
});

export const fieldName = input({
  label: "Field Name",
  type: "string",
  required: true,
  comments: "The name of the new field to create.",
  example: "Custom Field",
  placeholder: "Enter field name",
  clean: util.types.toString,
});

export const category = input({
  label: "Category",
  type: "string",
  required: true,
  example: "Custom Field",
  comments: "The grouping category under which the field is organized.",
  placeholder: "Enter field category",
  clean: util.types.toString,
});

export const fieldType = input({
  label: "Field Type",
  type: "string",
  required: true,
  model: [
    { label: "Text", value: "text" },
    { label: "Text Area", value: "text-area" },
    { label: "Number", value: "number" },
    { label: "Date", value: "date" },
    { label: "List", value: "list" },
    { label: "Multi-List", value: "multi-list" },
    { label: "Hierarchy-List", value: "hierarchy-list" },
    { label: "Currency", value: "currency" },
    { label: "Employee Reference", value: "employee-reference" },
    { label: "Document", value: "document" },
  ],
  comments: "The data type of the new field.",
  placeholder: "Select field type",
  clean: util.types.toString,
});

export const fieldDescription = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "A description of the field's purpose.",
  example: "This field stores custom employee data",
  placeholder: "Enter field description",
  clean: cleanStringInput,
});

export const historical = input({
  label: "Historical",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, this field keeps the history of its values, each being active starting from a certain date.",
  clean: util.types.toBool,
});
