import { input, util } from "@prismatic-io/spectral";
import { connection } from "./common";

const id = input({
  label: "Board ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the board.",
  clean: util.types.toString,
  placeholder: "Enter board ID",
  dataSource: "selectBoard",
  example: "553c3ef8b8cdcd1501ba1234",
});

export const listBoardsInputs = { connection };

export const retrieveBoardInputs = { connection, id };

export const selectBoardInputs = { connection };
