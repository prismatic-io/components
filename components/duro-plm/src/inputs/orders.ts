import { input } from "@prismatic-io/spectral";
import { connection, first } from "./common";
import { cleanStringInput, parseJsonArray } from "../util";

const name = input({
  label: "Name",
  type: "string",
  comments: "The name of the change order to create.",
  example: "ECO-2024-001: Update Component Materials",
  placeholder: "Enter change order name",
  required: true,
  clean: cleanStringInput,
});

const description = input({
  label: "Description",
  type: "text",
  required: false,
  comments:
    "A detailed description of the change order, including the reason for the change and expected impact.",
  example:
    "Replace aluminum housing with stainless steel to improve corrosion resistance in marine environments.",
  placeholder: "Enter change order description",
  clean: cleanStringInput,
});

const type = input({
  label: "Type",
  type: "string",
  required: true,
  comments:
    "The type of change order to create. ECO (Engineering Change Order), MCO (Manufacturing Change Order), or DCO (Document Change Order).",
  clean: cleanStringInput,
  default: "ECO",
  placeholder: "Select change order type",
  model: [
    {
      label: "ECO (Engineering Change Order)",
      value: "ECO",
    },
    {
      label: "MCO (Manufacturing Change Order)",
      value: "MCO",
    },
    {
      label: "DCO (Document Change Order)",
      value: "DCO",
    },
  ],
  example: "ECO",
});

const orderBy = input({
  label: "Order By",
  comments:
    "The field and direction to sort the change orders by. Results will be returned in the specified order.",
  example: '[{"con": "asc"}]',
  placeholder: "Select sort order",
  type: "string",
  required: false,
  clean: parseJsonArray,
  model: [
    {
      label: "ID: Ascending",
      value: '[{"con": "asc"}]',
    },
    {
      label: "ID: Descending",
      value: '[{"con": "desc"}]',
    },
    {
      label: "Last Modified: Ascending",
      value: '[{"lastModified": "asc"}]',
    },
    {
      label: "Last Modified: Descending",
      value: '[{"lastModified": "desc"}]',
    },
    {
      label: "Name: Ascending",
      value: '[{"name": "asc"}]',
    },
    {
      label: "Name: Descending",
      value: '[{"name": "desc"}]',
    },
  ],
});

export const createChangeOrderInputs = {
  connection,
  name,
  description,
  type,
};

export const listChangeOrdersInputs = {
  connection,
  orderBy,
  first,
};
