import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTechnicianExamplePayload } from "../../examplePayloads";
import { createTechnicianInputs } from "../../inputs";
import { createTechnicianOutputSchema } from "../../outputSchemas";
export const createTechnician = action({
  display: {
    label: "Create Technician",
    description: "Create a new technician.",
  },
  inputs: createTechnicianInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createTechnicianOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async () => createTechnicianExamplePayload,
  examplePayload: createTechnicianExamplePayload,
});
