import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { listTasksExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  customFieldsCode,
  dateCreatedGt,
  dateCreatedLt,
  dateDoneGt,
  dateDoneLt,
  dateUpdatedGt,
  dateUpdatedLt,
  dueDateGt,
  dueDateLt,
  getArchived,
  getAssignees,
  getlistId,
  getSubTasks,
  getTags,
  includeClosed,
  orderBy,
  page,
  reverse,
} from "../../inputs";
import type { ListTasksQueryParams } from "./types/ListTasksQueryParams";

const listId = getlistId(true, "Team ID (Workspace)");
const subTasks = getSubTasks(true, "Include or exclude subtasks. By default, subtasks are excluded.");
const archived = getArchived(false, "Archived?", false);
const assignees = getAssignees(false, "Filter by Assignees. Add Assingee");
const tags = getTags(false, "Filter by tags. Add a tag to filter.");

export const listTasks = action({
  display: {
    label: "List Tasks",
    description: "List the tasks in a list.",
  },
  examplePayload: listTasksExamplePayload,
  perform: async (
    context,
    {
      connection,
      listId,
      archived,
      page,
      orderBy,
      reverse,
      subTasks,
      includeClosed,
      assignees,
      tags,
      dueDateGt,
      dueDateLt,
      dateCreatedGt,
      dateCreatedLt,
      dateUpdatedGt,
      dateUpdatedLt,
      dateDoneGt,
      dateDoneLt,
      customFieldsCode,
    }
  ) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    let customFields = [];
    if (customFieldsCode?.length) {
      customFields = JSON.parse(customFieldsCode).custom_fields || [];
    }

    const params: ListTasksQueryParams = {
      archived,
      ...(page !== undefined && { page }),
      ...(orderBy?.length && { order_by: orderBy }),
      reverse,
      subtasks: subTasks,
      include_closed: includeClosed,
      ...(dueDateGt?.length && { due_date_gt: dueDateGt }),
      ...(dueDateLt?.length && { due_date_lt: dueDateLt }),
      ...(dateCreatedGt?.length && { date_created_gt: dateCreatedGt }),
      ...(dateCreatedLt?.length && { date_created_lt: dateCreatedLt }),
      ...(dateUpdatedGt?.length && { date_updated_gt: dateUpdatedGt }),
      ...(dateUpdatedLt?.length && { date_updated_lt: dateUpdatedLt }),
      ...(dateDoneGt?.length && { date_done_gt: dateDoneGt }),
      ...(dateDoneLt?.length && { date_done_lt: dateDoneLt }),
      ...(tags?.length && { tags }),
      ...(assignees?.length && { assignees }),
      ...(customFields.length && { custom_fields: customFields }),
    };

    const { data } = await client.get(`/list/${listId}/task`, {
      params,
    });

    return {
      data: data,
    };
  },
  inputs: {
    connection: connectionInput,
    listId,
    archived,
    page,
    orderBy,
    reverse,
    subTasks,
    includeClosed,
    assignees,
    tags,
    dueDateGt,
    dueDateLt,
    dateCreatedGt,
    dateCreatedLt,
    dateUpdatedGt,
    dateUpdatedLt,
    dateDoneGt,
    dateDoneLt,
    customFieldsCode,
  },
});
