import { action, util } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { updateListInputs } from "../../inputs";
import type { UpdateListBody } from "../types/UpdateListBody";
import type { UpdateListQueryParams } from "../types/UpdateListQueryParams";
import { updateListExamplePayload } from "../../examplePayloads";

export const updateList = action({
  display: {
    label: "Update List",
    description: "Updates the details of a list within a project.",
  },
  examplePayload: updateListExamplePayload,
  perform: async (
    context,
    { connection, projectId, listId, index, name, type, updateListBody },
  ) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const queryParams: UpdateListQueryParams = {
      index: util.types.toNumber(index),
      name,
      type,
    };
    let body = {};
    if (updateListBody.length)
      body = JSON.parse(updateListBody) as UpdateListBody;

    const { data } = await client.put(
      `/projects/${projectId}/lists/${listId}`,
      body,
      {
        params: queryParams,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      },
    );
    return { data };
  },
  inputs: updateListInputs,
});

export default { updateList };
