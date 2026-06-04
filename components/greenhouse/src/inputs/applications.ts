import { input, util } from "@prismatic-io/spectral";

const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};

export const application_id = input({
  label: "Application ID",
  type: "string",
  required: false,
  clean: cleanString,
  comments: "The unique identifier for the application.",
  placeholder: "Enter application ID",
  example: "69102626",
  dataSource: "applications",
});

export const last_activity_after = input({
  label: "Last Activity After",
  type: "string",
  required: false,
  comments:
    "The lower bound activity timestamp filter — only applications whose 'last_activity_at' is at or after this value are returned. Format: ISO-8601.",
  placeholder: "Enter timestamp (ISO-8601 format)",
  example: "2024-01-01T00:00:00Z",
  clean: cleanString,
});

export const source_id = input({
  label: "Source ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the source of the application.",
  placeholder: "Enter source ID",
  example: "2",
  clean: util.types.toInt,
});

export const prospect_pool_id = input({
  label: "Prospect Pool ID",
  type: "string",
  required: false,
  comments: "The unique identifier for the prospect pool for the application.",
  placeholder: "Enter prospect pool ID",
  example: "123",
  clean: util.types.toInt,
});

export const prospect_stage_id = input({
  label: "Prospect Stage ID",
  type: "string",
  required: false,
  comments:
    "The unique identifier for the prospect pool stage for the application.",
  placeholder: "Enter prospect stage ID",
  example: "456",
  clean: util.types.toInt,
});

export const referrer = input({
  label: "Referrer",
  type: "code",
  language: "json",
  required: true,
  comments:
    "The JSON object representing the referrer that brought the candidate to apply. Format: JSON object with type and value.",
  example: JSON.stringify(
    {
      type: "id",
      value: 123,
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
