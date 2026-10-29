import { input } from "@prismatic-io/spectral";
import { cleanString } from "../../util";
import { bodyFields } from "../general";
import { docEntry } from "./general";

export const comments = input({
  label: "Comments",
  type: "string",
  comments: "The comments to be added to the modified order.",
  example: "new comments - modified by Service Layer",
  placeholder: "new comments - modified by Service Layer",
  required: true,
  clean: cleanString,
});

export const updateOrderInputs = {
  DocEntry: docEntry,
  Comments: comments,
  bodyFields,
};
