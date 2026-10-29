import { input, util } from "@prismatic-io/spectral";

export const companyIdInput = input({
  label: "Company ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectCompany",
  comments: "Identifier of Company",
});

export const segmentId = input({
  label: "Segment ID",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments: "Id of the segment to be used as filter.",
});
