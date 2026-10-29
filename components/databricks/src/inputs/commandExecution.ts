import { input, util } from "@prismatic-io/spectral";

export const contextIdInput = input({
  label: "Execution Context ID",
  type: "string",
  required: true,
  comments:
    "The ID of the execution context, likely created by the Create Execution Context action.",
  placeholder: "Enter execution context ID",
  clean: util.types.toString,
});

export const languageIdInput = input({
  label: "Language",
  type: "string",
  required: true,
  default: "python",
  comments: "The programming language to use in the execution context.",
  model: ["python", "scala", "sql"].map((v) => ({ label: v, value: v })),
  clean: util.types.toString,
});

export const commandInput = input({
  label: "Command",
  type: "string",
  required: true,
  comments: "The executable code to run in the execution context.",
  example: "print(0.1 + 0.2)",
  placeholder: "Enter command to execute",
  clean: util.types.toString,
});

export const commandIdInput = input({
  label: "Command ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the command whose status will be retrieved.",
  clean: util.types.toString,
  example: "00000000000000000000000000000000",
  placeholder: "Enter command ID",
});
