import { input, util } from "@prismatic-io/spectral";
import { connection, effectiveDate } from "./common";
export const selectDepartmentInputs = {
  connection,
  effectiveDate,
};
export const selectGradeInputs = {
  connection,
  effectiveDate,
};
export const selectJobInputs = {
  connection,
  effectiveDate,
};
export const selectLocationInputs = {
  connection,
  effectiveDate,
};
export const selectPositionInputs = {
  connection,
  effectiveDate,
};
const usePublicWorkers = input({
  label: "Use Public Workers",
  type: "boolean",
  required: false,
  default: "false",
  comments:
    "When true, lists from the read-only Public Workers resource. When false, lists from the read/write Workers resource, which requires broader permissions.",
  clean: util.types.toBool,
});
export const selectPersonIdInputs = {
  connection,
  usePublicWorkers,
  effectiveDate,
};
