import { input, util } from "@prismatic-io/spectral";

export const taskId = input({
  label: "Task ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the task.",
  example: "21345678",
  dataSource: "selectTask",
  placeholder: "Enter task ID",
  clean: util.types.toString,
});
