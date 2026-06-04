import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listUserApplicationsExamplePayload } from "../../examplePayloads/users";
import { listUserGroupsInputs as listUserApplicationsInputs } from "../../inputs/users";

export const listUserApplications = action({
  display: {
    label: "List User Applications",
    description: "List applications for a specific user.",
  },
  inputs: listUserApplicationsInputs,
  perform: async (context, { connection, id }) => {
    const client = await createClient(connection, context.debug.enabled);

    const { data } = await client.get(`/users/${encodeURIComponent(id)}/appLinks`);

    return {
      data,
    };
  },
  examplePayload: listUserApplicationsExamplePayload,
});
