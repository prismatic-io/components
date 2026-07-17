import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { updateAgentExamplePayload as examplePayload } from "../../examplePayloads";
import { updateAgentInputs as inputs } from "../../inputs/agents";
export const updateAgent = action({
  display: {
    label: "Update Agent",
    description: "Updates an existing agent.",
  },
  perform: async (
    context,
    {
      connection,
      agentId,
      roles,
      scoreboardLevelId,
      departmentIds,
      additionalFields,
      agentsAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);
    const payload = {
      email: additionalFields.email,
      roles,
      scoreboard_level_id: scoreboardLevelId,
      address: additionalFields.address,
      occasional: additionalFields.occasional,
      signature: additionalFields.signature,
      department_ids: departmentIds,
      can_see_all_tickets_from_associated_departments:
        additionalFields.canSeeAllTicketsFromAssociatedDepartments,
      ...agentsAdditionalFields,
    };
    const { data } = await client.put(`/agents/${agentId}`, payload);
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
