import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const getNoteInputs = {
  connection,
  id: input({
    label: "Note ID",
    comments: "The unique identifier of the note.",
    placeholder: "Enter note ID",
    example: "12345678",
    type: "string",
    required: true,
    clean: util.types.toString,
    dataSource: "selectNote",
  }),
};
