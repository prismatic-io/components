import { action } from "@prismatic-io/spectral";
import { getDomoClient } from "../../client";
import { getListInputs } from "../../inputs";
import { getListExamplePayload } from "../../examplePayloads";

export const getList = action({
  display: {
    label: "Get List",
    description:
      "Retrieves the details of an individual list given a project id and a list id.",
  },
  examplePayload: getListExamplePayload,
  perform: async (context, { connection, projectId, listId }) => {
    const client = await getDomoClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/projects/${projectId}/lists/${listId}`,
      {
        headers: { Accept: "application/json" },
      },
    );
    return { data };
  },
  inputs: getListInputs,
});

export default { getList };
