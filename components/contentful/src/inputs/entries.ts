import { input, util } from "@prismatic-io/spectral";
import {
  ENTRY_BODY_DEFAULT,
  ENTRY_DEFAULT,
  ENTRY_TITLE_DEFAULT,
} from "../constants";
import { cleanCodeInput } from "../util";
import { connection, contentTypeId, environmentId, spaceId } from "./common";



const entryId = input({
  label: "Entry ID",
  type: "string",
  comments: "The unique identifier for the entry.",
  example: "5KsDBWseXY6QegucYAoacS",
  placeholder: "Enter entry ID",
  required: true,
  clean: util.types.toString,
  dataSource: "selectEntry",
});

const entryData = input({
  label: "Entry Data",
  type: "code",
  language: "json",
  comments:
    "The entry data as a JSON object containing fields and their values.",
  placeholder: "Enter entry data JSON",
  example: JSON.stringify(ENTRY_DEFAULT, null, 2),
  required: true,
  clean: cleanCodeInput,
});

const entryTitle = input({
  label: "Title",
  type: "code",
  language: "json",
  comments:
    "The title of the entry as a JSON object with locale keys. Locale key must match the original locale of the entry to be updated.",
  placeholder: "Enter entry title JSON",
  default: JSON.stringify(ENTRY_TITLE_DEFAULT, null, 2),
  required: false,
  clean: cleanCodeInput,
});

const entryBody = input({
  label: "Body",
  type: "code",
  language: "json",
  comments:
    "The body content of the entry as a JSON object with locale keys. Locale key must match the original locale of the entry to be updated.",
  placeholder: "Enter entry body JSON",
  example: JSON.stringify(ENTRY_BODY_DEFAULT, null, 2),
  required: false,
  clean: cleanCodeInput,
});

const patchOperations = input({
  label: "Patch Operations",
  type: "code",
  language: "json",
  comments: "A JSON array of JSON Patch (RFC 6902) operations.",
  placeholder: "Enter patch operations JSON array",
  example: JSON.stringify(
    [
      {
        op: "replace",
        path: "/fields/title/en-US",
        value: "Updated Title",
      },
    ],
    null,
    2,
  ),
  required: true,
  clean: cleanCodeInput,
});

const entryVersion = input({
  label: "Entry Version",
  type: "string",
  comments:
    "The current version number of the entry. Required for optimistic locking.",
  example: "1",
  placeholder: "Enter entry version",
  required: true,
  clean: util.types.toString,
});



export const archiveEntryInputs = {
  connection,
  spaceId,
  environmentId,
  entryId,
};



export const createEntryInputs = {
  connection,
  spaceId,
  environmentId,
  contentTypeId,
  entryData,
};



export const deleteEntryInputs = {
  connection,
  spaceId,
  environmentId,
  entryId,
};



export const getEntryInputs = {
  connection,
  spaceId,
  environmentId,
  entryId,
};



export const listEntriesInputs = {
  connection,
  spaceId,
  environmentId,
};



export const listPublishedEntriesInputs = {
  connection,
  spaceId,
  environmentId,
};



export const patchEntryInputs = {
  connection,
  spaceId,
  environmentId,
  entryId,
  patchOperations,
  entryVersion,
};



export const publishEntryInputs = {
  connection,
  spaceId,
  environmentId,
  entryId,
};



export const putEntryInputs = {
  connection,
  spaceId,
  environmentId,
  entryId,
  entryData: {
    ...entryData,
    comments:
      "The full entry data as a JSON object. All existing fields will be replaced with the provided data.",
  },
};



export const unarchiveEntryInputs = {
  connection,
  spaceId,
  environmentId,
  entryId,
};



export const unpublishEntryInputs = {
  connection,
  spaceId,
  environmentId,
  entryId,
};



export const updateEntryInputs = {
  connection,
  spaceId,
  environmentId,
  entryId,
  entryTitle: {
    ...entryTitle,
    comments:
      "The updated title of the entry. Locale key must match the original locale of the entry to be updated.",
  },
  entryBody: {
    ...entryBody,
    comments:
      "The updated body of the entry. Locale key must match the original locale of the entry to be updated.",
  },
};
