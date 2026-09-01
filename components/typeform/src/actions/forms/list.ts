import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  commonListInputs,
  connection,
  id,
  listFormsPagination,
} from "../../inputs";
import { fetchAllData } from "../../util";
import { listFormsResponse } from "../../examplePayloads/forms";
import type { Form } from "../../interfaces/forms";
export const listForms = action({
  display: {
    label: "List Forms",
    description:
      "Retrieves a list of JSON descriptions for all forms in your Typeform account (public and private).",
  },
  inputs: {
    connection,
    ...commonListInputs,
    pagination: listFormsPagination,
    workspaceId: {
      ...id,
      label: "Workspace Id",
      comments: "Retrieve typeforms for the specified workspace.",
      required: false,
    },
  },
  perform: async (
    context,
    { connection, pagination, fetchAll, workspaceId },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await fetchAllData<Form>(
      client,
      "/forms",
      {
        search: pagination.search,
        page: pagination.page,
        page_size: pagination.pageSize,
        order_by: pagination.orderBy,
        sort_by: pagination.sortBy,
        workspace_id: workspaceId,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listFormsResponse,
  },
});
