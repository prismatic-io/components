import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { assignTechniciansExamplePayload } from "../../examplePayloads";
import { assignTechniciansInputs } from "../../inputs";
import { assignTechniciansOutputSchema } from "../../outputSchemas";
export const assignTechnicians = action({
  display: {
    label: "Assign Technicians to Appointment",
    description: "Assigns the list of technicians to the appointment.",
  },
  inputs: assignTechniciansInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: assignTechniciansOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, jobAppointmentId, technicianIds }) => {
    const client = createClient(connection, "dispatch", context.debug.enabled);
    const { data } = await client.post(
      `/appointment-assignments/assign-technicians`,
      { jobAppointmentId, technicianIds },
    );
    return {
      data,
    };
  },
  examplePerform: async () => assignTechniciansExamplePayload,
  examplePayload: assignTechniciansExamplePayload,
});
