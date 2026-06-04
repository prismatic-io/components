import { input, util } from "@prismatic-io/spectral";
import { cleanObject, toOptionalNumber, toOptionalString } from "./util";
import {
  createDatabaseParent,
  createDatabasePayload,
  descriptionInputExample,
  propertiesInputsExample,
  sortInputExample,
} from "./examplePayloads";

export const connectionInput = input({
  label: "Connection",
  required: true,
  type: "connection",
  comments: "The Notion connection to use.",
});

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

export const dataSourceIdInput = input({
  label: "Data Source ID",
  required: true,
  type: "string",
  placeholder: "Enter data source ID",
  example: "668d797c76fa49349b05ad288df2d136",
  comments:
    "The unique identifier of the data source. Find this in the Notion URL or database settings menu. See [Notion API Data Sources](https://developers.notion.com/docs/working-with-databases).",
  clean: util.types.toString,
  dataSource: "selectDataSource",
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

export const resultTypeInput = input({
  label: "Result Type",
  type: "string",
  required: false,
  default: "database",
  comments:
    "Type of results to return. Use 'data_source' (recommended) for the new API or 'database' for legacy support.",
  model: [
    { label: "Data Sources (Recommended)", value: "data_source" },
    { label: "Databases (Legacy)", value: "database" },
  ],
  clean: toOptionalString,
});

export const pageIdInput = input({
  label: "Page ID",
  required: true,
  type: "string",
  placeholder: "Enter page ID",
  example: "d9824bdc84454327be8b5b47500af6ce",
  comments:
    "The unique identifier of the page in Notion. Find this in the page URL. See [Notion API Page Reference](https://developers.notion.com/reference/page).",
  clean: util.types.toString,
  dataSource: "selectPage",
});

export const databaseTitle = input({
  label: "Title",
  comments:
    "The title of the database as it appears in Notion, formatted as a rich text array.",
  required: false,
  type: "code",
  language: "json",
  clean: cleanObject,
  example: JSON.stringify(
    [
      {
        type: "text",
        text: {
          content: "Some words ",
          link: null,
        },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: "Some words ",
        href: null,
      },
    ],
    null,
    2,
  ),
});

export const startCursorInput = input({
  label: "Start Cursor",
  required: false,
  type: "string",
  placeholder: "Enter start cursor",
  example: "d9824bdc84454327be8b5b47500af6ce",
  comments:
    "The start cursor returned from a previous list or query action when at least one more page of records is available. Used for pagination.",
  clean: toOptionalString,
});

export const fetchAllInput = input({
  label: "Fetch All",
  required: false,
  type: "boolean",
  default: "false",
  comments:
    "When true, fetches all pages using pagination. This ignores the start cursor input.",
  clean: util.types.toBool,
});

export const userIdInput = input({
  label: "User ID",
  required: true,
  type: "string",
  placeholder: "Enter user ID",
  example: "d9824bdc84454327be8b5b47500af6ce",
  comments:
    "The unique identifier of the user in Notion. See [Notion API User Reference](https://developers.notion.com/reference/user).",
  clean: util.types.toString,
  dataSource: "selectUser",
});

export const filterInput = input({
  type: "code",
  label: "Filter Object",
  language: "json",
  required: false,
  example: JSON.stringify(
    {
      and: [
        {
          property: "Done",
          checkbox: {
            equals: true,
          },
        },
        {
          or: [
            {
              property: "Tags",
              contains: "A",
            },
            {
              property: "Tags",
              contains: "B",
            },
          ],
        },
      ],
    },
    null,
    2,
  ),
  clean: cleanObject,
  comments:
    "Filter conditions to apply to the database query. Supports compound filters using 'and' and 'or' operators. See [Notion API Filter Documentation](https://developers.notion.com/reference/post-database-query-filter).",
});

export const filterPropertiesInput = input({
  type: "code",
  label: "Filter Properties",
  language: "json",
  required: false,
  example: JSON.stringify(
    {
      Name: "example",
      Tag: ["tag1", "tag2"],
    },
    null,
    2,
  ),
  clean: cleanObject,
  comments:
    "Limit the properties included in the response. Provide an object where keys are property names and values are property values or arrays of values.",
});

export const filterPropertiesInputPage = input({
  type: "string",
  label: "Filter Properties",
  required: false,
  placeholder: "Enter comma-separated property IDs",
  example: "title,tags,status",
  comments:
    "Comma-separated list of page property IDs to include in the response. Use this to limit the response to specific page properties.",
  clean: toOptionalString,
});

export const pageSizeInput = input({
  type: "string",
  label: "Page Size",
  required: false,
  placeholder: "Enter page size",
  default: "50",
  example: "100",
  comments: "The number of items to return per page. Maximum: 100.",
  clean: toOptionalNumber,
});

export const properties = input({
  type: "code",
  label: "Properties",
  language: "json",
  required: true,
  example: JSON.stringify(
    {
      Name: {
        title: [
          {
            text: {
              content: "Tuscan kale",
            },
          },
        ],
      },
      Description: {
        rich_text: [
          {
            text: {
              content: "A dark green leafy vegetable",
            },
          },
        ],
      },
      "Food group": {
        select: {
          name: "🥬 Vegetable",
        },
      },
    },
    null,
    2,
  ),
  clean: cleanObject,
  comments:
    "The values of the page's properties. <strong>Important:</strong> If the parent is a database, the schema must match the parent database's properties. If the parent is a page, only 'title' is valid. [Learn more](https://developers.notion.com/reference/page-property-values)",
});

export const children = input({
  type: "code",
  label: "Children",
  language: "json",
  required: false,
  example: JSON.stringify(
    [
      {
        object: "block",
        heading_2: {
          rich_text: [
            {
              text: {
                content: "Lacinato kale",
              },
            },
          ],
        },
      },
      {
        object: "block",
        paragraph: {
          rich_text: [
            {
              text: {
                content:
                  "Lacinato kale is a variety of kale with a long tradition in Italian cuisine, especially that of Tuscany. It is also known as Tuscan kale, Italian kale, dinosaur kale, kale, flat back kale, palm tree kale, or black Tuscan palm.",
                link: {
                  url: "https://en.wikipedia.org/wiki/Lacinato_kale",
                },
              },
              href: "https://en.wikipedia.org/wiki/Lacinato_kale",
            },
          ],
          color: "default",
        },
      },
    ],
    null,
    2,
  ),
  clean: cleanObject,
  comments:
    "The content to be rendered on the new page, represented as an array of block objects. [Block reference](https://developers.notion.com/reference/block)",
});

export const icon = input({
  type: "code",
  label: "Icon",
  language: "json",
  required: false,
  example: JSON.stringify(
    {
      type: "external",
      external: {
        url: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80",
      },
    },
    null,
    2,
  ),
  clean: cleanObject,
  comments:
    "The icon of the new page. Either an [emoji object](https://developers.notion.com/reference/emoji-object) or an [external file object](https://developers.notion.com/reference/file-object).",
});

export const coverImage = input({
  type: "code",
  label: "Cover Image",
  language: "json",
  required: false,
  example: JSON.stringify(
    {
      type: "file",
      file: {
        url: "https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7b8b0713-dbd4-4962-b38b-955b6c49a573/My_test_image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221024%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221024T205211Z&X-Amz-Expires=3600&X-Amz-Signature=208aa971577ff05e75e68354e8a9488697288ff3fb3879c2d599433a7625bf90&X-Amz-SignedHeaders=host&x-id=GetObject",
        expiry_time: "2022-10-24T22:49:22.765Z",
      },
    },
    null,
    2,
  ),
  clean: cleanObject,
  comments:
    "The cover image of the new page, represented as a [file object](https://developers.notion.com/reference/file-object).",
});

export const parent = input({
  type: "code",
  label: "Parent",
  language: "json",
  required: true,
  example: JSON.stringify(
    { type: "page_id", page_id: "d9824bdc84454327be8b5b47500af6ce" },
    null,
    2,
  ),
  clean: cleanObject,
  comments:
    'The parent where the new page is inserted. <strong>For page parents:</strong> {"type": "page_id", "page_id": "..."}. <strong>For database parents (recommended):</strong> {"type": "data_source_id", "data_source_id": "..."}. Legacy format {"database_id": "..."} is supported for single-source databases.',
});

export const createDatabaseParentInput = input({
  type: "code",
  label: "Parent",
  language: "json",
  required: true,
  example: JSON.stringify(createDatabaseParent, null, 2),
  clean: cleanObject,
  comments:
    'The parent page where the database will be created. Format: {"type": "page_id", "page_id": "..."} or {"type": "workspace", "workspace": true} for workspace-level.',
});

export const initialDataSourcePropertiesInput = input({
  type: "code",
  label: "Initial Data Source Properties",
  language: "json",
  required: false,
  example: JSON.stringify(createDatabasePayload, null, 2),
  clean: cleanObject,
  comments:
    "Property schema for the initial data source. The keys are the names of properties as they appear in Notion.",
});

export const listOldDatabasesInputs = {
  connection: connectionInput,
  startCursor: startCursorInput,
  fetchAll: fetchAllInput,
};

export const selectDatabaseInputs = {
  connection: connectionInput,
};

export const selectDataSourceInputs = {
  connection: connectionInput,
};

export const selectPageInputs = {
  connection: connectionInput,
};

export const selectUserInputs = {
  connection: connectionInput,
};

export const isInlineInput = input({
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

export const archivedInput = input({
  label: "Archived",
  type: "boolean",
  required: false,
  comments:
    "When true, archives the database/data source. When false, unarchives it.",
  clean: util.types.toBool,
});

export const sortInput = input({
  type: "code",
  label: "Sort",
  language: "json",
  required: false,
  example: JSON.stringify(sortInputExample, null, 2),
  clean: cleanObject,
  comments:
    "Array of sort objects defining the order of query results. Earlier sorts take precedence. See [Notion API Sort Documentation](https://developers.notion.com/reference/post-database-query-sort).",
});

export const dataSourcePropertiesInput = input({
  type: "code",
  label: "Properties",
  language: "json",
  required: false,
  example: JSON.stringify(propertiesInputsExample, null, 2),
  clean: cleanObject,
  comments:
    "Property schema of the data source. The keys are the names of properties as they appear in Notion.",
});

export const descriptionInput = input({
  label: "Description",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(descriptionInputExample, null, 2),
  clean: cleanObject,
  comments:
    "The description of the data source formatted as a rich text array. See [Notion Rich Text Reference](https://developers.notion.com/reference/rich-text).",
});


export const retrieveDatabaseInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
};

export const createDatabaseInputs = {
  connection: connectionInput,
  parent: createDatabaseParentInput,
  title: databaseTitle,
  initialDataSourceProperties: initialDataSourcePropertiesInput,
  icon,
  description: descriptionInput,
  cover: coverImage,
};

export const updateDatabaseInputs = {
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


export const retrieveDataSourceInputs = {
  connection: connectionInput,
  dataSourceId: dataSourceIdInput,
};

export const queryDataSourceInputs = {
  connection: connectionInput,
  dataSourceId: dataSourceIdInput,
  fetchAll: fetchAllInput,
  sorts: sortInput,
  filter: filterInput,
  startCursor: startCursorInput,
  pageSize: pageSizeInput,
  resultType: resultTypeInput,
  filterProperties: filterPropertiesInput,
};

export const updateDataSourceInputs = {
  connection: connectionInput,
  dataSourceId: dataSourceIdInput,
  properties: dataSourcePropertiesInput,
  title: databaseTitle,
  icon,
  databaseId: {
    ...databaseIdInput,
    required: false,
    comments:
      "If provided, the parent of the data source will be changed to the specified database ID.",
  },
};

export const listDataSourcesInputs = {
  connection: connectionInput,
  startCursor: startCursorInput,
  fetchAll: fetchAllInput,
};

export const createDataSourceInputs = {
  connection: connectionInput,
  databaseId: databaseIdInput,
  properties: dataSourcePropertiesInput,
  title: databaseTitle,
  icon,
};


export const pagesPollingTriggerInputs = {
  connection: connectionInput,
};

export const dataSourcesPollingTriggerInputs = {
  connection: connectionInput,
};

export const dataSourceItemsPollingTriggerInputs = {
  connection: connectionInput,
  dataSourceId: dataSourceIdInput,
};
