import { input } from "@prismatic-io/spectral";
import { cleanId } from "../util/transforms";
import {
  connection,
  effectiveDate,
  expand,
  fetchAll,
  includeMetadataLinks,
  pagination,
  personId,
} from "./common";
const assignmentId = input({
  label: "Assignment ID",
  type: "string",
  required: true,
  comments:
    "The unique numeric identifier for the Oracle HCM assignment (AssignmentId).",
  placeholder: "Enter assignment ID",
  example: "300100551559732",
  clean: cleanId,
});
export const getAssignmentInputs = {
  connection,
  personId,
  assignmentId,
  expand,
  includeMetadataLinks,
};
export const listAssignmentsInputs = {
  connection,
  personId,
  fetchAll,
  pagination,
  effectiveDate,
  expand,
  includeMetadataLinks,
};
