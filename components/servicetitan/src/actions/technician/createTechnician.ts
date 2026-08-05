import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTechnicianExamplePayload } from "../../examplePayloads";
import { createTechnicianInputs } from "../../inputs";
export const createTechnician = action({
  display: {
    label: "Create Technician",
    description: "Create new technician",
  },
  inputs: createTechnicianInputs,
  perform: async (
    context,
    {
      connection,
      aadUserId,
      accountCreationMethod,
      additionalFields,
      businessUnitId,
      customFields,
      email,
      home,
      licenseType,
      login,
      memo,
      name,
      password,
      phoneNumber,
      positions,
      roleId,
    },
  ) => {
    const client = createClient(connection, "settings", context.debug.enabled);
    const { data } = await client.post(`/technicians`, {
      aadUserId,
      accountCreationMethod,
      bio: additionalFields.bio,
      burdenRate: additionalFields.burdenRate,
      businessUnitId,
      customFields,
      dailyGoal: additionalFields.dailyGoal,
      email,
      home,
      jobFilter: additionalFields.jobFilter,
      jobHistoryDateFilter: additionalFields.jobHistoryDateFilter,
      licenseType,
      login,
      memo,
      name,
      password,
      phoneNumber,
      positions,
      roleId,
      team: additionalFields.team,
    });
    return {
      data,
    };
  },
  examplePayload: createTechnicianExamplePayload,
});
