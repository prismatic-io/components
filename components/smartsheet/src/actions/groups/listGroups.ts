import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listGroupsExamplePayload } from "../../examplePayloads";
import { listGroupsInputs } from "../../inputs";

export const listGroups = action({
  display: {
    label: "List Groups",
    description: "Lists all groups in the organization.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, includeAll, modifiedSince, page, pageSize },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/groups`, {
      params: { includeAll, modifiedSince, page, pageSize },
    });
    return { data };
  },
  inputs: listGroupsInputs,
  examplePayload: listGroupsExamplePayload,
});
