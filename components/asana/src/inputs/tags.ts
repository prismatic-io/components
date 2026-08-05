import { input } from "@prismatic-io/spectral";
import { TAG_OPT_FIELDS } from "../constants";
import {
  color,
  connectionInput,
  followersList,
  name,
  notes,
  optFields,
  pagination,
  tagId,
  taskId,
  workspaceId,
} from "./common";
const tagName = input({
  label: "Tag Name",
  type: "string",
  required: true,
  comments:
    "Note: if multiple tags share a name, only one tag will be returned.",
});
export const createTagInputs = {
  asanaConnection: connectionInput,
  color,
  followersList,
  name,
  notes,
  optFields: { ...optFields, default: TAG_OPT_FIELDS },
  workspaceId,
};
export const updateTagInputs = {
  asanaConnection: connectionInput,
  color,
  name,
  notes,
  optFields: { ...optFields, default: TAG_OPT_FIELDS },
  tagId,
};
export const getTagInputs = {
  asanaConnection: connectionInput,
  optFields: { ...optFields, default: TAG_OPT_FIELDS },
  tagId,
};
export const deleteTagInputs = {
  asanaConnection: connectionInput,
  pagination,
  tagId,
};
export const listTagsInputs = {
  asanaConnection: connectionInput,
  optFields: { ...optFields, default: TAG_OPT_FIELDS },
  pagination,
  workspaceId,
};
export const listTagsInTaskInputs = {
  asanaConnection: connectionInput,
  optFields: { ...optFields, default: TAG_OPT_FIELDS },
  pagination,
  taskId,
};
export const findTagByNameInputs = {
  asanaConnection: connectionInput,
  tagName,
  workspaceId,
  optFields: { ...optFields, default: TAG_OPT_FIELDS },
};
export const selectTagInputs = {
  connection: connectionInput,
  workspaceId: { ...workspaceId, dataSource: undefined },
};
