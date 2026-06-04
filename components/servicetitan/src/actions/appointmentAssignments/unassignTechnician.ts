import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { assignTechniciansResponse as unassignTechniciansResponse } from "../../examplePayloads";
import { connection, jobAppointmentId, technicianIds } from "../../inputs";

export const unassignTechnicians = action({
  display: {
    label: "Unassign Technician to Appointment",
    description: "Un-assigns the list of technicians from the appointment",
  },
  inputs: {
    connection,
    jobAppointmentId,
    technicianIds: {
      ...technicianIds,
      required: true,
      comments: "Unassign these technicians to the appointment.",
    },
  },
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
  examplePayload: {
    data: unassignTechniciansResponse,
  },
});
