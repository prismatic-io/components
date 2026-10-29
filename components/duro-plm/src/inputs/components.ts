import { input } from "@prismatic-io/spectral";
import { connection, first } from "./common";
import { cleanStringInput } from "../util";

const libraryType = input({
  label: "Library Type",
  comments:
    "The type of library to query. Company (GENERAL) contains shared production components, while Sandbox (PERSONAL) contains personal or test components.",
  example: "GENERAL",
  placeholder: "Select Library Type",
  type: "string",
  required: true,
  clean: cleanStringInput,
  model: [
    {
      label: "Company",
      value: "GENERAL",
    },
    {
      label: "Sandbox",
      value: "PERSONAL",
    },
  ],
});

const componentId = input({
  label: "Component ID",
  comments: "The unique identifier for the component to retrieve.",
  type: "string",
  required: true,
  example: "666c5a9528e821000815990e",
  placeholder: "Enter Component ID",
  clean: cleanStringInput,
  dataSource: "selectComponent",
});

export const listComponentsInputs = { connection, libraryType, first };

export const getComponentByIdInputs = {
  connection,
  componentId,
};
