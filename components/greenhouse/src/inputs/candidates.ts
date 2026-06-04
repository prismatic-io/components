import { input, util } from "@prismatic-io/spectral";

const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};

export const candidate_id = input({
  label: "Candidate ID",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The unique identifier for the candidate.",
  placeholder: "Enter candidate ID",
  example: "53883394",
  dataSource: "candidates",
});

export const candidate_ids = input({
  label: "Candidate IDs",
  type: "string",
  required: false,
  comments:
    "The comma-separated list of candidate IDs to return (e.g. '123,456,789'). When combined with Job ID, only candidates with an application on the job are returned. A maximum of 50 candidates can be returned this way.",
  placeholder: "Enter comma-separated candidate IDs",
  clean: cleanString,
  example: "123,456,789",
});

export const company = input({
  label: "Company",
  type: "string",
  required: false,
  comments: "The company name associated with the candidate.",
  placeholder: "Enter company name",
  example: "Acme Corporation",
  clean: cleanString,
});

export const title = input({
  label: "Title",
  type: "string",
  required: false,
  comments: "The job title associated with the candidate.",
  placeholder: "Enter job title",
  example: "Software Engineer",
  clean: cleanString,
});

export const phone_numbers = input({
  label: "Phone Numbers",
  type: "code",
  required: false,
  language: "json",
  comments:
    "The JSON array of phone numbers for the candidate. Passing an empty array will clear all. Format: JSON array of objects.",
  example: JSON.stringify(
    [
      {
        value: "555-1212",
        type: "mobile",
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => {
    if (value !== null && value !== "") {
      return JSON.parse(value as string);
    }
    return undefined;
  },
});

export const addresses = input({
  label: "Addresses",
  type: "code",
  required: false,
  language: "json",
  comments:
    "The JSON array of postal addresses for the candidate. Passing an empty array will clear all. Format: JSON array of objects.",
  example: JSON.stringify(
    [
      {
        value: "123 Main St, New York, NY 10001",
        type: "home",
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => {
    if (value !== null && value !== "") {
      return JSON.parse(value as string);
    }
    return undefined;
  },
});

export const email_addresses = input({
  label: "Email Addresses",
  type: "code",
  required: false,
  language: "json",
  comments:
    "The JSON array of email addresses for the candidate. Passing an empty array will clear all. Format: JSON array of objects.",
  example: JSON.stringify(
    [
      {
        value: "john.doe+work@example.com",
        type: "work",
      },
      {
        value: "john.doe@example.com",
        type: "personal",
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => {
    if (value !== null && value !== "") {
      return JSON.parse(value as string);
    }
    return undefined;
  },
});

export const website_addresses = input({
  label: "Website Addresses",
  type: "code",
  required: false,
  language: "json",
  comments:
    "The JSON array of website addresses for the candidate. Passing an empty array will clear all. Format: JSON array of objects.",
  example: JSON.stringify(
    [
      {
        value: "johndoe.example.com",
        type: "personal",
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => {
    if (value !== null && value !== "") {
      return JSON.parse(value as string);
    }
    return undefined;
  },
});

export const social_media_addresses = input({
  label: "Social Media Addresses",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The JSON array of social media addresses for the candidate. Passing an empty array will clear all. Format: JSON array of objects.",
  example: JSON.stringify(
    [
      {
        value: "linkedin.com/in/johndoe",
      },
      {
        value: "@johndoe",
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => {
    if (value !== null && value !== "") {
      return JSON.parse(value as string);
    }
    return undefined;
  },
});

export const educations = input({
  label: "Educations",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The JSON array of education records for the candidate. Format: JSON array of objects.",
  example: JSON.stringify(
    [
      {
        school_id: 459,
        discipline_id: 940,
        degree_id: 1230,
        start_date: "2001-09-15T00:00:00.000Z",
        end_date: "2004-05-15T00:00:00.000Z",
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => {
    if (value !== null && value !== "") {
      return JSON.parse(value as string);
    }
    return undefined;
  },
});

export const employments = input({
  label: "Employments",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The JSON array of employment records for the candidate. Format: JSON array of objects.",
  example: JSON.stringify(
    [
      {
        company_name: "Acme Corporation",
        title: "Software Engineer",
        start_date: "2012-08-15T00:00:00.000Z",
        end_date: "2016-05-15T00:00:00.000Z",
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => {
    if (value !== null && value !== "") {
      return JSON.parse(value as string);
    }
    return undefined;
  },
});

export const tags = input({
  label: "Tags",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "The tags to assign to the candidate as an array of strings. Passing an empty array will clear all.",
  placeholder: "Enter tags",
  example: '["Senior", "Remote"]',
  default: ["000xxx"],
  clean: (value) => {
    if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
      return value;
    }
    return undefined;
  },
});

export const recruiter = input({
  label: "Recruiter",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The JSON object representing the recruiter assigned to the candidate. Format: JSON object.",
  example: JSON.stringify(
    {
      id: 92120,
      first_name: "Jane",
      last_name: "Smith",
      name: "Jane Smith",
      employee_id: "67890",
    },
    null,
    2,
  ),
  clean: (value: unknown) => {
    if (value !== null && value !== "") {
      return JSON.parse(value as string);
    }
    return undefined;
  },
});

export const coordinator = input({
  label: "Coordinator",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The JSON object representing the coordinator assigned to the candidate. Format: JSON object.",
  example: JSON.stringify(
    {
      id: 453636,
      first_name: "Jane",
      last_name: "Smith",
      name: "Jane Smith",
      employee_id: "12345",
    },
    null,
    2,
  ),
  clean: (value: unknown) => {
    if (value !== null && value !== "") {
      return JSON.parse(value as string);
    }
    return undefined;
  },
});


export const attachments = input({
  label: "Attachments",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The JSON array of attachment records for the candidate. Format: JSON array of objects.",
  example: JSON.stringify(
    [
      {
        filename: "Resume.pdf",
        url: "https://prod-heroku.s3.amazonaws.com/...",
        type: "resume",
        created_at: "2024-01-15T18:45:27.137Z",
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => {
    if (value !== null && value !== "") {
      return JSON.parse(value as string);
    }
    return undefined;
  },
});


export const activity_feed_notes = input({
  label: "Activity Feed Notes",
  type: "code",
  language: "json",
  required: false,
  comments:
    "The JSON array of activity feed note objects for the candidate. Format: JSON array of objects.",
  example: JSON.stringify(
    [
      {
        user_id: "158108",
        body: "Candidate was moved into Recruiter Phone Screen for Software Engineer position.",
        visibility: "admin_only",
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => {
    if (value !== null && value !== "") {
      return JSON.parse(value as string);
    }
    return undefined;
  },
});

export const applications = input({
  label: "Applications",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The JSON array of application objects to create with the candidate. At least one is required. Format: JSON array of objects.",
  example: JSON.stringify(
    [
      {
        job_id: 215725,
      },
      {
        job_id: 185289,
      },
    ],
    null,
    2,
  ),
  clean: (value: unknown) => {
    if (value !== null && value !== "") {
      return JSON.parse(value as string);
    }
    return undefined;
  },
});

export const is_private = input({
  type: "boolean",
  label: "Is Private",
  comments: "When true, the candidate will be marked as private.",
  required: false,
  default: "false",
  clean: util.types.toBool,
});
