import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { updateListExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  getAssignee,
  getContent,
  getDueDateInt,
  getDueDateTime,
  getListName,
  getlistId,
  getPriority,
  getStatus,
  getUnsetStatus,
} from "../../inputs";
import type { UpdateListBody } from "./types/UpdateListBody";

const listId = getlistId(true, "List ID");
const listName = getListName(true, "Name of the list");
const content = getContent(true, "Content");
const dueDate = getDueDateInt(true, "Due date of the list");
const dueDateTime = getDueDateTime(true, "Set to true if due date has a time", false);
const priority = getPriority(true, "Priority of the list");
const assignee = getAssignee(true, "User ID of the list assignee");
const status = getStatus(true, "Status refers to the List color rather than the task Statuses available in the List.");
const unsetStatus = getUnsetStatus(
  true,
  "By default, this is false. To remove the List color use unset_status: true.",
  false
);

export const updateList = action({
  display: {
    label: "Update List",
    description: "Update a list's name, info description, due date/time, priority, assignee, and color.",
  },
  examplePayload: updateListExamplePayload,
  perform: async (
    context,
    { clickUpConnection, listId, name, content, dueDate, dueDateTime, priority, assignee, status, unsetStatus }
  ) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const body: UpdateListBody = {
      name,
      content,
      due_date: dueDate,
      due_date_time: dueDateTime,
      priority,
      assignee,
      status,
      unset_status: unsetStatus,
    };

    const { data } = await client.put(`/list/${listId}`, body);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    listId,
    name: listName,
    content,
    dueDate,
    dueDateTime,
    priority,
    assignee,
    status,
    unsetStatus,
  },
});
