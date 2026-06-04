import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { createListExamplePayload } from "../../examplePayloads";
import {
  assigneeInt,
  connectionInput,
  getContent,
  getDueDateInt,
  getDueDateTime,
  getFolderId,
  getListName,
  getPriority,
  getStatus,
} from "../../inputs";
import type { CreateListBody } from "./types/CreateListBody";

const listName = getListName(true, "Name of the new list");
const folderId = getFolderId(true, "Folder ID");
const content = getContent(false, "Content");
const dueDate = getDueDateInt(false, "Initial due date of the new list");
const dueDateTime = getDueDateTime(false, "Due Date Time", false);
const priority = getPriority(false, "Initial priority of the new list");
const status = getStatus(false, "Status refers to the List color rather than the task Statuses available in the List.");

export const createList = action({
  display: {
    label: "Create List",
    description: "Add a new list to a folder.",
  },
  examplePayload: createListExamplePayload,
  perform: async (
    context,
    { clickUpConnection, folderId, name, content, dueDate, dueDateTime, priority, assigneeInt, status }
  ) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const body: CreateListBody = {
      name,
      ...(content?.length && { content }),
      ...(dueDate !== undefined && { due_date: dueDate }),
      due_date_time: dueDateTime,
      ...(priority !== undefined && { priority }),
      ...(assigneeInt !== undefined && { assignee: assigneeInt }),
      ...(status?.length && { status }),
    };

    const { data } = await client.post(`/folder/${folderId}/list`, body);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    folderId,
    listName,
    content,
    dueDate,
    dueDateTime,
    priority,
    assigneeInt,
    status,
    name: listName,
  },
});
