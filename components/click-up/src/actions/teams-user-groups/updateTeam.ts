import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { updateTeamExamplePayload } from "../../examplePayloads";
import { addMember, connectionInput, groupId, removeMember, teamHandle, teamName } from "../../inputs";

interface Members {
  add?: number[];
  rem?: number[];
}

interface Body {
  name?: string;
  handle?: string;
  members?: Members;
}

export const updateTeam = action({
  display: {
    label: "Update Team",
    description: "Update a user group (Team) of users that can be assigned to items in a workspace.",
  },
  examplePayload: updateTeamExamplePayload,
  perform: async (context, { clickUpConnection, groupId, teamName, teamHandle, addMember, removeMember }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const body: Body = {};

    if (teamName?.length) body.name = teamName;

    if (teamHandle?.length) body.handle = teamHandle;

    if (addMember || removeMember) {
      body.members = {} as Members;

      if (addMember?.length) body.members.add = addMember;
      if (removeMember?.length) body.members.rem = removeMember;
    }

    const { data } = await client.put(`/group/${groupId}`, body);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    groupId,
    teamName,
    teamHandle,
    addMember,
    removeMember,
  },
});
