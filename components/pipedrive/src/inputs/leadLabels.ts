import { input, util } from "@prismatic-io/spectral";
import { connectionInput, leadLabelIdInput } from "./common";
import { cleanString } from "../util";

const colorModel = [
  { label: "Green", value: "green" },
  { label: "Blue", value: "blue" },
  { label: "Red", value: "red" },
  { label: "Yellow", value: "yellow" },
  { label: "Purple", value: "purple" },
  { label: "Gray", value: "gray" },
];

const nameRequired = input({
  label: "Name",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The display name for the lead label.",
  example: "Hot",
  placeholder: "Enter label name",
});

const colorRequired = input({
  label: "Color",
  type: "string",
  required: true,
  model: colorModel,
  clean: util.types.toString,
  comments: "The display color used to identify the label in the Pipedrive UI.",
  example: "green",
  placeholder: "Select label color",
});

const nameOptional = input({
  label: "Name",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The display name for the lead label.",
  example: "Hot",
  placeholder: "Enter label name",
});

const colorOptional = input({
  label: "Color",
  type: "string",
  required: false,
  model: colorModel,
  clean: cleanString,
  comments: "The display color used to identify the label in the Pipedrive UI.",
  example: "green",
  placeholder: "Select label color",
});

export const getLeadLabelsInputs = {
  connection: connectionInput,
};

export const addLeadLabelInputs = {
  connection: connectionInput,
  name: nameRequired,
  color: colorRequired,
};

export const updateLeadLabelInputs = {
  connection: connectionInput,
  id: leadLabelIdInput,
  name: nameOptional,
  color: colorOptional,
};

export const deleteLeadLabelInputs = {
  connection: connectionInput,
  id: leadLabelIdInput,
};
