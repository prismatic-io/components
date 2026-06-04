import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const deleteNoteInputs = {
  connection,
  id: input({
    label: "Note ID",
    placeholder: "Enter Note ID",
    example: "12345678",
    comments: "Unique identifier of the note.",
    type: "string",
    required: true,
    clean: util.types.toString,
    dataSource: "selectNote",
  }),
};
