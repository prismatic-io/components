import { input, util } from "@prismatic-io/spectral";
import {
  createDatabaseParent,
  createDatabasePayload,
  descriptionInputExample,
} from "../examplePayloads";
import { cleanObject, toOptionalString } from "../utils";
import {
  children,
  connectionInput,
  coverImage,
  databaseTitle,
  icon,
  parent,
  properties,
} from "./common";
export const databaseIdInput = input({
  label: "Database ID",
  required: true,
  type: "string",
  placeholder: "Enter database ID",
  example: "d9824bdc84454327be8b5b47500af6ce",
  comments:
    "The unique identifier of the database. For single-source databases, this is also the data source ID. Find this in the Notion URL or database settings menu. See [Notion API Database Reference](https://developers.notion.com/reference/database).",
  dataSource: "selectDatabase",
  clean: util.types.toString,
});
export const databaseIdOptionalInput = input({
  label: "Database ID",
  required: false,
  type: "string",
  placeholder: "Enter database ID",
  example: "d9824bdc84454327be8b5b47500af6ce",
  comments:
    "The unique identifier of the database. For single-source databases, this can be used instead of Data Source ID. For multi-source databases, use Data Source ID.",
  dataSource: "selectDatabase",
  clean: toOptionalString,
});
export const archivedInput = input({
  label: "Archived",
  type: "boolean",
  required: false,
  comments:
    "When true, archives the database/data source. When false, unarchives it.",
  clean: util.types.toBool,
});
const createDatabaseParentInput = input({
  type: "code",
  label: "Parent",
  language: "json",
  required: true,
  placeholder: "Enter a JSON parent object",
  example: JSON.stringify(createDatabaseParent, null, 2),
  clean: cleanObject,
  comments:
    'The parent page where the database will be created. Format: {"type": "page_id", "page_id": "..."} or {"type": "workspace", "workspace": true} for workspace-level.',
});
const initialDataSourcePropertiesInput = input({
  type: "code",
  label: "Initial Data Source Properties",
  language: "json",
  required: false,
  placeholder: "Enter a JSON property schema object",
  example: JSON.stringify(createDatabasePayload, null, 2),
  clean: cleanObject,
  comments:
    "Property schema for the initial data source. The keys are the names of properties as they appear in Notion.",
});
const isInlineInput = input({
  label: "Is Inline",
  type: "string",
  required: false,
  comments:
    "Whether the database should be displayed inline in the parent page. If not provided, the inline status will not be updated.",
  model: [
    { label: "True", value: "true" },
    { label: "False", value: "false" },
  ],
  clean: toOptionalString,
});
const descriptionInput = input({
  label: "Description",
  type: "code",
  language: "json",
  required: false,
  placeholder: "Enter a rich text array for the description",
  example: JSON.stringify(descriptionInputExample, null, 2),
  clean: cleanObject,
  comments:
    "The description of the data source formatted as a rich text array. See [Notion Rich Text Reference](https://developers.notion.com/reference/rich-text).",
});
export const retrieveDatabaseInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
};
export const updatedCreateDatabaseInputs = {
  connection: connectionInput,
  parent: createDatabaseParentInput,
  title: databaseTitle,
  initialDataSourceProperties: initialDataSourcePropertiesInput,
  icon,
  description: descriptionInput,
  cover: coverImage,
};
export const updatedUpdateDatabaseInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
  parent: {
    ...createDatabaseParentInput,
    required: false,
    comments:
      "If provided, the parent of the database will be changed to the specified page ID or workspace.",
  },
  title: databaseTitle,
  isInline: isInlineInput,
  icon,
  cover: coverImage,
};
export const createDatabaseItemInputs = {
  connection: connectionInput,
  parent: {
    ...parent,
    comments:
      'The parent database where the new page is inserted. Recommended format: {"type": "data_source_id", "data_source_id": "..."}. Legacy format {"database_id": "..."} is supported for single-source databases.',
    example: JSON.stringify(
      {
        type: "data_source_id",
        data_source_id: "d9824bdc84454327be8b5b47500af6ce",
      },
      null,
      2,
    ),
  },
  properties,
  children,
  icon,
  coverImage,
};
