import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber } from "../util";
import { boardId, connectionInput, fetchAll, limit, page } from "./common";

const boardName = input({
  label: "Board Name",
  type: "string",
  required: true,
  comments: "The display name of the Monday.com board to create.",
  placeholder: "Enter board name",
  example: "Project Tracker",
  clean: util.types.toString,
});

const boardKind = input({
  label: "Board Kind",
  type: "string",
  required: true,
  example: "public",
  model: [
    { label: "Public", value: "public" },
    { label: "Private", value: "private" },
    { label: "Shareable", value: "shareable" },
  ],
  comments:
    "The visibility level of the board. Public boards are visible to all team members; private boards are restricted to invited members; shareable boards can be shared with guests.",
  placeholder: "Select board kind",
  clean: util.types.toString,
});

const folderId = input({
  label: "Folder ID",
  type: "string",
  required: false,
  comments:
    "The unique identifier of the folder in which the board will be created.",
  placeholder: "Enter Folder ID",
  example: "9876543",
  clean: toOptionalNumber,
});

const templateId = input({
  label: "Template ID",
  type: "string",
  required: false,
  comments:
    "The unique identifier of the Monday.com template the board is based on.",
  placeholder: "Enter Template ID",
  example: "1122334",
  clean: toOptionalNumber,
});

const workspaceId = input({
  label: "Workspace ID",
  type: "string",
  required: false,
  comments:
    "The unique identifier of the workspace where the board will be created.",
  placeholder: "Enter Workspace ID",
  example: "5566778",
  clean: toOptionalNumber,
});

export const listBoardsInputs = {
  connection: connectionInput,
  fetchAll,
  limit,
  page,
};

export const getBoardInputs = {
  connection: connectionInput,
  boardId,
};

export const createBoardInputs = {
  connection: connectionInput,
  boardName,
  boardKind,
  folderId,
  workspaceId,
  templateId,
};

export const archiveBoardInputs = {
  connection: connectionInput,
  boardId,
};

export const selectBoardInputs = {
  connection: connectionInput,
};
