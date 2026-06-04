import { input, util } from "@prismatic-io/spectral";
import { connectionInput } from "./common";

const showNewEmployees = input({
  label: "Show New Employees",
  type: "boolean",
  required: false,
  default: "true",
  example: "true",
  comments:
    "When true, employees inserted since the last poll are included in the trigger output.",
  clean: util.types.toBool,
});

const showUpdatedEmployees = input({
  label: "Show Updated Employees",
  type: "boolean",
  required: false,
  default: "true",
  example: "true",
  comments:
    "When true, employees updated or deleted since the last poll are included in the trigger output. Inspect the `action` field on each record to distinguish updates from deletions.",
  clean: util.types.toBool,
});

export const pollChangesInputs = {
  connection: connectionInput,
  showNewEmployees,
  showUpdatedEmployees,
};
