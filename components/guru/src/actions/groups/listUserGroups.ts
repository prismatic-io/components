import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { listUserGroupsInputs } from "../../inputs";
import { listUserGroupsPayload } from "../../examplePayloads";

export const listUserGroups = action({
  display: {
    label: "List User Groups",
    description: "Returns all groups on the team",
  },
  perform: async (context, { connection }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const { data } = await client.get("/groups");

    return { data };
  },
  inputs: listUserGroupsInputs,
  examplePayload: listUserGroupsPayload,
});
