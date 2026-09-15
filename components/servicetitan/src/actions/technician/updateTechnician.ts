import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateTechnicianExamplePayload } from "../../examplePayloads";
import { updateTechnicianInputs } from "../../inputs";
import { updateTechnicianOutputSchema } from "../../outputSchemas";
export const updateTechnician = action({
  display: {
    label: "Update Technician",
    description: "Update a technician.",
  },
  inputs: updateTechnicianInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateTechnicianOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async () => updateTechnicianExamplePayload,
  examplePayload: updateTechnicianExamplePayload,
});
