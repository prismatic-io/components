import { input, util } from "@prismatic-io/spectral";

export const applicantId = input({
  label: "Applicant ID",
  type: "string",
  required: true,
  comments: "The ID of the applicant to retrieve",
  placeholder: "1234-5678",
  example: "1234-5678",
  clean: util.types.toString,
});
