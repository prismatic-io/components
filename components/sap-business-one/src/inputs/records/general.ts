import { input, util } from "@prismatic-io/spectral";

export const recordType = input({
  label: "Record Type",
  type: "string",
  comments:
    "The type of record to use for the operation (e.g., JournalEntries, Activities, BusinessPartners). This corresponds to the Service Layer entity name.",
  example: "JournalEntries",
  placeholder: "Enter record type",
  required: true,
  clean: util.types.toString,
});

export const recordId = input({
  label: "Record ID",
  type: "string",
  comments:
    "The unique identifier for the record. This is typically an integer value (DocEntry or similar).",
  example: "12345",
  placeholder: "Enter record ID",
  required: true,
  clean: util.types.toString,
});

export const defaultRecordInputs = {
  recordType,
  recordId,
};
