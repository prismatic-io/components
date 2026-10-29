import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, invites, region } from "../../inputs";
import { createInviteExamplePayload } from "../../examplePayloads";

export const createUserInvites = action({
  display: {
    label: "Create User Invite",
    description: "Invites a list of users to join a Workspace.",
  },
  inputs: {
    connectionInput,
    region,
    invites,
  },
  perform: async (context, { connectionInput, region, invites }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.post(
      `/invites`,
      {
        invites: invites || undefined,
      },
      {
        headers: {
          "Content-Type": "application/vnd.segment.v1+json",
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: createInviteExamplePayload,
  },
});
