import { input, util } from "@prismatic-io/spectral";

const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};

export const opening_id = input({
  label: "Opening ID",
  type: "string",
  required: false,
  comments:
    "The unique identifier for an opening. When included, only jobs that contain at least one opening with this ID are returned.",
  placeholder: "Enter opening ID",
  example: "123",
  clean: cleanString,
});

export const opening_ids = input({
  label: "Opening IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The opening identifiers for the job. Must be a valid set of opening IDs.",
  placeholder: "Enter opening IDs",
  example: '["123", "124", "125"]',
  default: ["000000"],
});

export const office_id = input({
  label: "Office ID",
  type: "string",
  required: false,
  comments:
    "The unique identifier for the office. When included, only jobs in this specific office are returned.",
  placeholder: "Enter office ID",
  example: "234",
  clean: cleanString,
  dataSource: "offices",
});

export const external_office_id = input({
  label: "External Office ID",
  type: "string",
  required: false,
  comments:
    "The external system office identifier. May be used instead of Office ID and represents the ID of the office in an external system.",
  placeholder: "Enter external office ID",
  example: "abc13425",
  clean: cleanString,
});

export const template_job_id = input({
  label: "Template Job ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier for the job used as a template. The new job will inherit most settings from this template job. The On-Behalf-Of user must have access to this job.",
  placeholder: "Enter template job ID",
  example: "127817",
  clean: util.types.toString,
  dataSource: "jobs",
});

export const number_of_openings = input({
  label: "Number of Openings",
  type: "string",
  required: true,
  comments: "The number of openings that will be created for this job.",
  placeholder: "Enter number of openings",
  example: "3",
  clean: util.types.toString,
});

export const job_post_name = input({
  label: "Job Post Name",
  type: "string",
  required: false,
  comments:
    "The display name for the new job post. When omitted, the job post names from the base job are copied.",
  placeholder: "Enter job post name",
  example: "Senior Software Engineer - Remote",
  clean: cleanString,
});

export const job_name = input({
  label: "Job Name",
  type: "string",
  required: false,
  comments:
    'The internal name of the new job. When omitted, the name of the new job will be "Copy Of (the template job\'s name)".',
  placeholder: "Enter job name",
  example: "Software Engineer - Backend",
  clean: cleanString,
});

export const notes = input({
  label: "Notes",
  type: "string",
  required: false,
  comments: "The free-form notes attached to the hiring plan.",
  placeholder: "Enter notes",
  example: "Looking for candidates with 5+ years experience",
  clean: cleanString,
});

export const anywhere = input({
  label: "Anywhere",
  type: "boolean",
  required: false,
  comments:
    "When true, indicates the job can be done from anywhere (remote position).",
  clean: util.types.toBool,
});

export const team_and_responsibilities = input({
  label: "Team and Responsibilities",
  type: "string",
  required: false,
  comments:
    "The description of the team the candidate would join and the responsibilities of the role.",
  placeholder: "Enter team and responsibilities description",
  example: "Join our engineering team to build scalable web applications",
  clean: cleanString,
});

export const how_to_sell_this_job = input({
  label: "How to Sell This Job",
  type: "string",
  required: false,
  comments:
    "The recruiter-facing description of the desirable aspects of the job.",
  placeholder: "Enter selling points",
  example: "Competitive salary, flexible hours, and great company culture",
  clean: cleanString,
});
