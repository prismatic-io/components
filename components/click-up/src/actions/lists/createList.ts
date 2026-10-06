import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { createListExamplePayload } from "../../examplePayloads";
import { createListInputs } from "../../inputs";
import { createListOutputSchema } from "../../outputSchemas";
import type { CreateListBody } from "../../types";
export const createList = action({
  display: {
    label: "Create List",
    description: "Add a new list to a folder.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createListOutputSchema,
  }),
  examplePayload: createListExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      clickUpConnection,
      folderId,
      name,
      content,
      dueDate,
      dueDateTime,
      priority,
      assigneeInt,
      status,
    },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
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
  examplePerform: async (_context, { name }) => ({
    data: {
      ...createListExamplePayload.data,
      name,
    },
  }),
  inputs: createListInputs,
});
