import { input } from "@prismatic-io/spectral";
import { cleanId } from "../util/transforms";
import {
  connection,
  effectiveDate,
  fetchAll,
  includeMetadataLinks,
  pagination,
} from "./common";
const gradeId = input({
  label: "Grade ID",
  type: "string",
  required: true,
  dataSource: "selectGrade",
  comments: "The unique numeric identifier for the Oracle HCM grade (GradeId).",
  placeholder: "Enter grade ID",
  example: "300100012345678",
  clean: cleanId,
});
export const getGradeInputs = {
  connection,
  effectiveDate,
  gradeId,
  includeMetadataLinks,
};
export const listGradesInputs = {
  connection,
  fetchAll,
  pagination,
  effectiveDate,
  includeMetadataLinks,
};
