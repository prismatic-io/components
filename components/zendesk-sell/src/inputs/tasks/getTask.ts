import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";

export const getTaskInputs = {
  connection,
  id: input({
    label: "Task ID",
    comments: "The unique identifier of the task to retrieve.",
    placeholder: "Enter task ID",
    example: "12345678",
    type: "string",
    required: true,
    clean: util.types.toString,
    dataSource: "selectTask",
  }),
};
