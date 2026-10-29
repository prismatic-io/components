import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { defaultListActionsInputs } from "../../inputs/general";
import { listGroupsExamplePayload } from "../../examplePayloads/groups";

export const listGroups = action({
  display: {
    label: "List Groups",
    description: "Returns a list of groups.",
  },
  perform: async (context, { connection, queryParams }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/groups`, {
      params: queryParams,
    });

    return {
      data,
    };
  },
  inputs: defaultListActionsInputs,
  examplePayload: listGroupsExamplePayload,
});
