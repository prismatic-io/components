import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  commonListInputs,
  connection,
  id,
  sortBy,
  orderBy,
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
    workspaceId: {
      ...id,
      label: "Workspace Id",
      comments: "Retrieve typeforms for the specified workspace.",
      required: false,
    },
    sortBy,
    orderBy,
  },
  perform: async (
    context,
    {
      connection,
      page,
      pageSize,
      search,
      fetchAll,
      orderBy,
      sortBy,
      workspaceId,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await fetchAllData<Form>(
      client,
      "/forms",
      {
        search,
        page,
        page_size: pageSize,
        order_by: orderBy,
        sort_by: sortBy,
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
