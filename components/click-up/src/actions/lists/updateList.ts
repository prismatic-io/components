import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { updateListExamplePayload } from "../../examplePayloads";
import { updateListInputs } from "../../inputs";
import { updateListOutputSchema } from "../../outputSchemas";
import type { UpdateListBody } from "../../types";
export const updateList = action({
  display: {
    label: "Update List",
    description:
      "Update a list's name, info description, due date/time, priority, assignee, and color.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateListOutputSchema,
  }),
  examplePayload: updateListExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      clickUpConnection,
      listId,
      name,
      content,
      dueDate,
      dueDateTime,
      priority,
      assignee,
      status,
      unsetStatus,
    },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
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
  examplePerform: async (_context, { name }) => ({
    data: {
      ...updateListExamplePayload.data,
      ...(name && { name }),
    },
  }),
  inputs: updateListInputs,
});
