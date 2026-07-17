import { action } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { createAgentExamplePayload as examplePayload } from "../../examplePayloads";
import { createAgentInputs as inputs } from "../../inputs/agents";
export const createAgent = action({
  display: {
    label: "Create Agent",
    description: "Creates a new agent in Freshservice.",
  },
  perform: async (
    context,
    {
      connection,
      firstName,
      email,
      roles,
      lastName,
      contactInfo,
      occasional,
      jobTitle,
      departmentIds,
      canSeeAllTicketsFromAssociatedDepartments,
      agentsAdditionalFields,
    },
  ) => {
    const client = createFreshserviceClient(connection, context.debug.enabled);
    const payload = {
      first_name: firstName,
      email,
      roles,
      last_name: lastName,
      address: contactInfo.address,
      occasional,
      job_title: jobTitle,
      work_phone_number: contactInfo.workPhoneNumber,
      mobile_phone_number: contactInfo.mobilePhoneNumber,
      department_ids: departmentIds,
      can_see_all_tickets_from_associated_departments:
        canSeeAllTicketsFromAssociatedDepartments,
      ...agentsAdditionalFields,
    };
    const { data } = await client.post(`/agents`, payload);
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
