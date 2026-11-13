import type { KeyValuePair } from "@prismatic-io/spectral";
import { util } from "@prismatic-io/spectral";
import isEmpty from "lodash.isempty";
import type { Attendee, AttendeeType, BodyType } from "@microsoft/microsoft-graph-types";
import { LOOK_BACK_DATE_PATTERN, RENEWAL_EXPIRATION_MINUTES } from "../constants";

export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const cleanNumberInput = (value: unknown): number | undefined =>
  value === undefined || value === null || value === "" ? undefined : util.types.toNumber(value);

export const filterFalsyValuesFromArray = (array: unknown[]): unknown[] => {
  return array.filter((value) => !isEmpty(value));
};

export const cleanFunctionForBccAndCcInputs = (values: unknown): string[] => {
  if (!values) return [];

  const filteredValues = filterFalsyValuesFromArray(values as unknown[]) as string[];
  if (!filteredValues?.length) return [];
  return filteredValues.reduce((acc: string[], address: string) => {
    return acc.concat(
      address
        .split(",")
        .map((part) => part.trim())
        .filter((part) => part !== ""),
    );
  }, [] as string[]);
};

export const cleanRequiredRecipients = (values: unknown): string[] => {
  const recipients = cleanFunctionForBccAndCcInputs(values);
  if (recipients.length === 0) {
    throw new Error("To must contain at least one email address.");
  }
  return recipients;
};

export const cleanAttachments = (values: unknown, inputName: string): unknown[] => {
  if (!values) return [];
  try {
    const attachments = util.types.toObject(values);
    if (Array.isArray(attachments)) {
      if (attachments?.length) {
        const data = ((attachments as KeyValuePair[]) || []).map((attachment) => {
          if (typeof attachment !== "object" || attachment === null) {
            throw new Error("Attachment is not an object");
          }
          const { data, contentType } = util.types.toBufferDataPayload(attachment.value);
          return {
            "@odata.type": "#microsoft.graph.fileAttachment",
            name: attachment.key,
            contentBytes: data.toString("base64"),
            contentType,
          };
        });
        return data;
      }
      return [];
    }
  } catch (error) {
    console.error(error);
  }
  throw new Error(`${inputName} must be an array of files`);
};

export const toAttendees = (rawValue: unknown): Attendee[] => {
  if (!Array.isArray(rawValue)) {
    throw new Error("Unexpected format of attendees collection.");
  }

  return (rawValue as KeyValuePair<unknown>[]).map<Attendee>(({ key, value }) => ({
    emailAddress: { address: util.types.toString(key) },
    type: util.types.toString(value) as AttendeeType,
  }));
};

export const cleanOptionalAttendees = (rawValue: unknown): Attendee[] =>
  rawValue ? toAttendees(rawValue) : [];

export const toCommaSeparatedString = (value: unknown): string => {
  if (Array.isArray(value)) {
    return value.join(",");
  }
  return util.types.toString(value);
};

export const cleanExpirationDateTime = (rawValue: unknown): string => {
  const defaultDate = new Date();
  defaultDate.setTime(defaultDate.getTime() + RENEWAL_EXPIRATION_MINUTES * 60 * 1000);

  const value = rawValue || defaultDate;
  if (value instanceof Date) {
    return value.toISOString();
  }
  return util.types.toString(value);
};

export const toStringArray = (rawValue: unknown): unknown => {
  if (!Array.isArray(rawValue)) {
    return rawValue;
  }
  return rawValue.map((v) => util.types.toString(v));
};

export const toBodyContentType = (value: unknown): BodyType => {
  if (!["text", "html"].includes(util.types.toString(value))) {
    throw new Error("Invalid body content type. Must be 'text' or 'html'");
  }
  return util.types.toString(value) as BodyType;
};

export const lookBackDateClean = (value: unknown): string => {
  if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
    return "";
  }

  const raw = typeof value === "string" ? value.trim() : String(value);
  const match = typeof value === "string" ? raw.match(LOOK_BACK_DATE_PATTERN) : null;
  if (!match) {
    throw new Error(`Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`);
  }

  const [, yearStr, monthStr, dayStr] = match;
  const year = Number(yearStr);
  const month = Number(monthStr);
  const day = Number(dayStr);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    throw new Error(`Look-back Date must be a date in YYYY-MM-DD format. Received: ${raw}`);
  }

  if (parsed.getTime() > Date.now()) {
    throw new Error(`Look-back Date cannot be a future date. Received: ${raw}`);
  }

  return parsed.toISOString();
};
