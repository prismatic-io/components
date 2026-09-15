import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { unassignTechniciansExamplePayload } from "../../examplePayloads";
import { unassignTechniciansInputs } from "../../inputs";
import { unassignTechniciansOutputSchema } from "../../outputSchemas";
export const unassignTechnicians = action({
  display: {
    label: "Unassign Technicians from Appointment",
    description: "Un-assigns the list of technicians from the appointment.",
  },
  inputs: unassignTechniciansInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: unassignTechniciansOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, jobAppointmentId, technicianIds }) => {
    const client = createClient(connection, "dispatch", context.debug.enabled);
    const { data } = await client.post(
      `/appointment-assignments/unassign-technicians`,
      { jobAppointmentId, technicianIds },
    );
    return {
      data,
    };
  },
  examplePerform: async () => unassignTechniciansExamplePayload,
  examplePayload: unassignTechniciansExamplePayload,
});
