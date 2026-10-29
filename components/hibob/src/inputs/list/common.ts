import { input, util } from "@prismatic-io/spectral";
import { cleanIntegerInput } from "../../util";

export const listName = input({
  label: "List Name",
  type: "string",
  required: true,
  comments: "The display name identifying the company list.",
  example: "Departments",
  dataSource: "selectCompanyList",
  placeholder: "Enter list name",
  clean: util.types.toString,
});

export const itemId = input({
  label: "Item ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the list item.",
  example: "1044123",
  placeholder: "Enter item ID",
  clean: util.types.toString,
});

export const itemName = input({
  label: "Item Name",
  type: "string",
  required: true,
  comments: "The display value shown for the list item.",
  example: "Human Resources",
  placeholder: "Enter item name",
  clean: util.types.toString,
});

export const parentId = input({
  label: "Parent ID",
  type: "string",
  required: false,
  comments: "ID of the new hierarchy parent node.",
  example: "1234567890",
  placeholder: "Enter parent ID",
  clean: cleanIntegerInput,
});

export const includeArchived = input({
  label: "Include Archived",
  type: "boolean",
  required: false,
  comments: "When true, includes archived items in the response.",
  default: "false",
  clean: util.types.toBool,
});
