import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { updateTeamExamplePayload } from "../../examplePayloads";
import { updateTeamInputs } from "../../inputs";
import { updateTeamOutputSchema } from "../../outputSchemas";
import type {
  UpdateTeamBody as Body,
  UpdateTeamMembers as Members,
} from "../../types";
export const updateTeam = action({
  display: {
    label: "Update Team",
    description:
      "Update a user group (Team) of users that can be assigned to items in a workspace.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateTeamOutputSchema,
  }),
  examplePayload: updateTeamExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      clickUpConnection,
      groupId,
      teamName,
      teamHandle,
      addMember,
      removeMember,
    },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
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
  examplePerform: async (_context, { teamName, teamHandle }) => ({
    data: {
      ...updateTeamExamplePayload.data,
      ...(teamName && { name: teamName }),
      ...(teamHandle && { handle: teamHandle }),
    },
  }),
  inputs: updateTeamInputs,
});
