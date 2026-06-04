import { input, util } from "@prismatic-io/spectral";

export const number = input({
  label: "Number",
  example: "1896-S",
  comments: "The number of the item.",
  placeholder: "Enter item number",
  required: true,
  type: "string",
  clean: util.types.toString,
});

export const itemDisplayName = input({
  label: "Display Name",
  example: "ATHENS Desk",
  comments: "The display name of the item.",
  placeholder: "Enter display name",
  required: true,
  type: "string",
  clean: util.types.toString,
});
