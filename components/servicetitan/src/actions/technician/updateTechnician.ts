import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTechnicianExamplePayload as updateTechnicianExamplePayload } from "../../examplePayloads";
import { updateTechnicianInputs } from "../../inputs";
export const updateTechnician = action({
  display: {
    label: "Update Technician",
    description: "Update a technician",
  },
  inputs: updateTechnicianInputs,
  perform: async (
    context,
    {
      connection,
      aadUserId,
      additionalFields,
      businessUnitId,
      customFields,
      email,
      home,
      licenseType,
      login,
      memo,
      name,
      phoneNumber,
      positions,
      roleId,
      technicianId,
    },
  ) => {
    const client = createClient(connection, "settings", context.debug.enabled);
    const { data } = await client.patch(`/technicians/${technicianId}`, {
      aadUserId,
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
      phoneNumber,
      positions,
      roleId,
      team: additionalFields.team,
    });
    return {
      data,
    };
  },
  examplePayload: updateTechnicianExamplePayload,
});
