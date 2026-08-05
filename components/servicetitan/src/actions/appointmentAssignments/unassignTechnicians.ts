import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { assignTechniciansExamplePayload as unassignTechniciansExamplePayload } from "../../examplePayloads";
import { unassignTechniciansInputs } from "../../inputs";
export const unassignTechnicians = action({
  display: {
    label: "Unassign Technician to Appointment",
    description: "Un-assigns the list of technicians from the appointment",
  },
  inputs: unassignTechniciansInputs,
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
  examplePayload: unassignTechniciansExamplePayload,
});
