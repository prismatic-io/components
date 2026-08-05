import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { assignTechniciansExamplePayload } from "../../examplePayloads";
import { assignTechniciansInputs } from "../../inputs";
export const assignTechnicians = action({
  display: {
    label: "Assign Technician to Appointment",
    description: "Assigns the list of technicians to the appointment",
  },
  inputs: assignTechniciansInputs,
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
  examplePayload: assignTechniciansExamplePayload,
});
