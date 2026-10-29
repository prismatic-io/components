import { input, util } from "@prismatic-io/spectral";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The BambooHR connection to use.",
});

export const employeeId = input({
  label: "Employee ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the employee.",
  placeholder: "Enter employee ID",
  clean: util.types.toString,
  example: "42",
  dataSource: "selectEmployee",
});

export const categoryId = input({
  label: "Category ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the file category.",
  placeholder: "Enter category ID",
  clean: util.types.toString,
  example: "20",
});

export const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments: "The name to assign to the uploaded file, including its extension.",
  placeholder: "Enter file name",
  clean: util.types.toString,
  example: "example.pdf",
});

export const share = input({
  label: "Share",
  type: "boolean",
  default: "false",
  comments: "When true, the file is shared with the employee.",
  clean: (value) => (util.types.toBool(value) ? "yes" : "no"),
});

export const file = input({
  label: "File Contents",
  type: "string",
  required: true,
  comments:
    "The binary contents of the file to upload, typically referenced from a previous step.",
  clean: util.types.toData,
});
