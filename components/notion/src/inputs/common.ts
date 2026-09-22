import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanObject, toOptionalNumber, toOptionalString } from "../utils";
export const connectionInput = input({
  label: "Connection",
  required: true,
  type: "connection",
  comments: "The Notion connection to use.",
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
    "When true, automatically fetches all pages of results using pagination. This ignores the Start Cursor input.",
  clean: util.types.toBool,
});
const pageSizeInput = input({
  type: "string",
  label: "Page Size",
  required: false,
  placeholder: "Enter page size",
  example: "100",
  comments: "The number of items to return per page. Maximum: 100.",
  clean: toOptionalNumber,
});
export const paginationInput = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Cursor and page-size controls for paging through results.",
  inputs: { startCursor: startCursorInput, pageSize: pageSizeInput },
});
export const databaseTitle = input({
  label: "Title",
  comments:
    "The title of the database as it appears in Notion, formatted as a rich text array.",
  required: false,
  type: "code",
  language: "json",
  clean: cleanObject,
  placeholder: "Enter a rich text array for the title",
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
export const filterInput = input({
  type: "code",
  label: "Filter Object",
  language: "json",
  required: false,
  placeholder: "Enter a JSON filter object",
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
export const properties = input({
  type: "code",
  label: "Properties",
  language: "json",
  required: true,
  placeholder: "Enter a JSON object of property values",
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
  placeholder: "Enter a JSON array of block objects",
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
  placeholder: "Enter a JSON emoji or external file object",
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
  placeholder: "Enter a JSON file object",
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
  placeholder: "Enter a JSON parent object",
  example: JSON.stringify(
    { type: "page_id", page_id: "d9824bdc84454327be8b5b47500af6ce" },
    null,
    2,
  ),
  clean: cleanObject,
  comments:
    'The parent where the new page is inserted. <strong>For page parents:</strong> {"type": "page_id", "page_id": "..."}. <strong>For database parents (recommended):</strong> {"type": "data_source_id", "data_source_id": "..."}. Legacy format {"database_id": "..."} is supported for single-source databases.',
});
