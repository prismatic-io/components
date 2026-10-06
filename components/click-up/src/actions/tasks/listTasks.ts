import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { listTasksExamplePayload } from "../../examplePayloads";
import { listTasksInputs } from "../../inputs";
import { listTasksOutputSchema } from "../../outputSchemas";
import type { ListTasksQueryParams } from "../../types";
export const listTasks = action({
  display: {
    label: "List Tasks",
    description: "List the tasks in a list.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTasksOutputSchema,
  }),
  examplePayload: listTasksExamplePayload,
  performSafety: "safe",
  perform: async (
    context,
    {
      connection,
      listId,
      page,
      subTasks,
      filters,
      assignees,
      tags,
      dateRangeFilters,
    },
  ) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    let customFields = [];
    if (filters?.customFieldsCode?.length) {
      customFields = JSON.parse(filters.customFieldsCode).custom_fields || [];
    }
    const params: ListTasksQueryParams = {
      archived: filters?.archived,
      ...(page !== undefined && { page }),
      ...(filters?.orderBy?.length && { order_by: filters.orderBy }),
      reverse: filters?.reverse,
      subtasks: subTasks,
      include_closed: filters?.includeClosed,
      ...(dateRangeFilters?.dueDateGt?.length && {
        due_date_gt: dateRangeFilters.dueDateGt,
      }),
      ...(dateRangeFilters?.dueDateLt?.length && {
        due_date_lt: dateRangeFilters.dueDateLt,
      }),
      ...(dateRangeFilters?.dateCreatedGt?.length && {
        date_created_gt: dateRangeFilters.dateCreatedGt,
      }),
      ...(dateRangeFilters?.dateCreatedLt?.length && {
        date_created_lt: dateRangeFilters.dateCreatedLt,
      }),
      ...(dateRangeFilters?.dateUpdatedGt?.length && {
        date_updated_gt: dateRangeFilters.dateUpdatedGt,
      }),
      ...(dateRangeFilters?.dateUpdatedLt?.length && {
        date_updated_lt: dateRangeFilters.dateUpdatedLt,
      }),
      ...(dateRangeFilters?.dateDoneGt?.length && {
        date_done_gt: dateRangeFilters.dateDoneGt,
      }),
      ...(dateRangeFilters?.dateDoneLt?.length && {
        date_done_lt: dateRangeFilters.dateDoneLt,
      }),
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
  inputs: listTasksInputs,
});
