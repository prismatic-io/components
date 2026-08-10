import { input } from "@prismatic-io/spectral";
import { cleanId } from "../util/transforms";
import {
  connection,
  effectiveDate,
  fetchAll,
  includeMetadataLinks,
  pagination,
} from "./common";
const jobId = input({
  label: "Job ID",
  type: "string",
  required: true,
  dataSource: "selectJob",
  comments: "The unique numeric identifier for the Oracle HCM job (JobId).",
  placeholder: "Enter job ID",
  example: "300100012345678",
  clean: cleanId,
});
export const getJobInputs = {
  connection,
  effectiveDate,
  jobId,
  includeMetadataLinks,
};
export const listJobsInputs = {
  connection,
  fetchAll,
  pagination,
  effectiveDate,
  includeMetadataLinks,
};
