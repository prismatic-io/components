import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const updateNoteInputs = {
  connection,

  resourceType: input({
    label: "Resource Type",
    comments:
      "The type of resource the note is attached to. Possible values: lead, contact, deal.",
    placeholder: "Enter resource type",
    example: "lead",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  resourceId: input({
    label: "Resource ID",
    comments: "The unique identifier of the resource the note is attached to.",
    placeholder: "Enter resource ID",
    example: "12345678",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  content: input({
    label: "Content",
    comments: "The body text of the note.",
    placeholder: "Enter note content",
    example: "Highly important.",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),

  isImportant: input({
    label: "Is Important",
    comments: "When true, marks the note as important.",
    type: "string",
    default: "",
    model: [
      { label: "", value: "" },
      { label: "True", value: "true" },
      { label: "False", value: "false" },
    ],
    required: false,
    clean: util.types.toString,
  }),

  tags: input({
    label: "Tag",
    comments: "Tags to apply to the note.",
    example: "premium",
    type: "string",
    collection: "valuelist",
    required: false,
  }),

  type: input({
    label: "Type",
    comments:
      "The type of note. Possible values: regular or other types supported by the API.",
    placeholder: "Enter note type",
    example: "regular",
    type: "string",
    required: false,
    clean: util.types.toString,
  }),
};
