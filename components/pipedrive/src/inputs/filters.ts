import { input, util } from "@prismatic-io/spectral";
import { connectionInput, filterIdInput } from "./common";
import { cleanString } from "../util";

const type = input({
  label: "Type",
  type: "string",
  model: [
    { label: "Deals", value: "deals" },
    { label: "Leads", value: "leads" },
    { label: "Org", value: "org" },
    { label: "People", value: "people" },
    { label: "Products", value: "products" },
    { label: "Activity", value: "activity" },
  ],
  clean: cleanString,
  comments: "The resource type whose filters should be returned.",
  example: "deals",
  placeholder: "Select filter type",
});

const conditions = input({
  label: "Conditions",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The filter conditions, expressed as a JSON object string. Format: JSON.",
  example: '{"glue":"and","conditions":[]}',
  placeholder: "Enter conditions JSON",
});

const name = input({
  label: "Name",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "A human-readable label that identifies the filter.",
  example: "Open Deals",
  placeholder: "Enter filter name",
});

export const getFiltersInputs = {
  connection: connectionInput,
  type,
};

export const getFilterInputs = {
  connection: connectionInput,
  id: filterIdInput,
};

export const updateFilterInputs = {
  connection: connectionInput,
  id: filterIdInput,
  conditions,
  name,
};
