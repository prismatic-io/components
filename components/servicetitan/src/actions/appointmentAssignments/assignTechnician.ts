import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { assignTechniciansResponse } from "../../examplePayloads";
import { connection, jobAppointmentId, technicianIds } from "../../inputs";

export const assignTechnicians = action({
  display: {
    label: "Assign Technician to Appointment",
    description: "Assigns the list of technicians to the appointment",
  },
  inputs: {
    connection,
    jobAppointmentId,
    technicianIds: {
      ...technicianIds,
      required: true,
      comments: "Assign these technicians to the appointment.",
    },
  },
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
  examplePayload: {
    data: assignTechniciansResponse,
  },
});
