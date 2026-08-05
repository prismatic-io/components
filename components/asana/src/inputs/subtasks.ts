import { input, util } from "@prismatic-io/spectral";
import { OPTIONAL_FIELDS } from "../constants";
import { connectionInput, optFields, pagination, taskId } from "./common";
const listAllNestedSubtasks = input({
  label: "List All Nested Subtasks",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, recursively lists subtasks of subtasks rather than only direct subtasks of the parent task.",
  clean: util.types.toBool,
});
export const listSubtasksInputs = {
  asanaConnection: connectionInput,
  listAllNestedSubtasks,
  optFields: { ...optFields, default: OPTIONAL_FIELDS },
  pagination,
  taskId,
};
