import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll, limit, name, offset } from "./common";

export const pageId = input({
  label: "Page ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the Domo page.",
  placeholder: "Enter Page ID",
  example: "123456",
  dataSource: "pages",
  clean: util.types.toString,
});

export const parentId = input({
  label: "Parent ID",
  comments:
    "The unique identifier of the parent page. If provided, the page will be created as a subpage.",
  type: "string",
  required: false,
  placeholder: "Enter Parent ID",
  example: "123456",
  clean: util.types.toString,
});

export const locked = input({
  label: "Locked",
  comments:
    "When true, restricts other users the ability to make edits to page or its content.",
  type: "string",
  required: false,
  default: "",
  placeholder: "Select lock status",
  model: [
    { label: "", value: "" },
    {
      label: "TRUE",
      value: "TRUE",
    },
    {
      label: "FALSE",
      value: "FALSE",
    },
  ],
  clean: util.types.toString,
});

export const cardIds = input({
  label: "Card ID",
  comments: "The ID of the card to add to the page.",
  type: "string",
  collection: "valuelist",
  required: false,
  placeholder: "Enter Card IDs",
  example: '["123", "456"]',
  clean: (stringsArray: unknown) =>
    (Array.isArray(stringsArray) ? stringsArray : []).map((string: string) =>
      util.types.toInt(string),
    ),
});

export const userIds = input({
  label: "User ID",
  comments: "The ID of the user that will be given access to view the page.",
  type: "string",
  collection: "valuelist",
  required: false,
  placeholder: "Enter User IDs",
  example: '["959463190", "871428330"]',
  clean: (stringsArray: unknown) =>
    (Array.isArray(stringsArray) ? stringsArray : []).map((string: string) =>
      util.types.toInt(string),
    ),
});

export const groupIds = input({
  label: "Group ID",
  comments: "The ID of the group that will be given access to view the page.",
  type: "string",
  collection: "valuelist",
  required: false,
  placeholder: "Enter Group IDs",
  example: '["100", "200"]',
  clean: (stringsArray: unknown) =>
    (Array.isArray(stringsArray) ? stringsArray : []).map((string: string) =>
      util.types.toInt(string),
    ),
});

export const updatePageBody = input({
  label: "Update Page Body",
  type: "code",
  language: "json",
  required: true,
  comments: "The page object to update.",
  example: JSON.stringify(
    {
      page_id: 0,
      name: "Sales Dashboard",
      parentId: 0,
      locked: true,
      collectionIds: [0],
      cardIds: [0],
      visibility: {
        userIds: [0],
        groupIds: [0],
      },
    },
    null,
    2,
  ),
  clean: util.types.toString,
});

export const createPageInputs = {
  connection,
  name: input({ ...name, comments: "The name of the page." }),
  parentId,
  locked,
  cardIds,
  userIds,
  groupIds,
};

export const deletePageInputs = {
  connection,
  pageId,
};

export const getPageInputs = {
  connection,
  pageId,
};

export const listPagesInputs = {
  connection,
  fetchAll,
  limit: input({
    ...limit,
    required: false,
    comments:
      "The amount of pages to return in the list. The default is 50 and the maximum is 500.",
  }),
  offset: input({
    ...offset,
    required: false,
    comments:
      "The offset of the page ID to begin list of pages within the response.",
  }),
};

export const updatePageInputs = {
  connection,
  pageId,
  updatePageBody,
};
