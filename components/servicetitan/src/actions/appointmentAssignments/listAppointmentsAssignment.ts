import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAppointmentsAssignmentExamplePayload } from "../../examplePayloads";
import { listAppointmentsAssignmentInputs } from "../../inputs";
import { listAppointmentsAssignmentOutputSchema } from "../../outputSchemas";
import type { AppointmentAssignment } from "../../types";
import { fetchAllRecords } from "../../util";
export const listAppointmentsAssignment = action({
  display: {
    label: "List Appointment Assignments",
    description: "Retrieve a list of appointment assignments.",
  },
  inputs: listAppointmentsAssignmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAppointmentsAssignmentOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, pagination, includeTotal, sort, customQueryParams, fetchAll },
  ) => {
    const client = createClient(connection, "dispatch", context.debug.enabled);
    if (fetchAll) {
      const data = await fetchAllRecords<AppointmentAssignment>(
        client,
        "/appointment-assignments",
        {
          includeTotal,
          sort,
          ...customQueryParams,
        },
      );
      return {
        data,
      };
    }
    const { data } = await client.get(`/appointment-assignments`, {
      params: {
        page: pagination.page,
        pageSize: pagination.pageSize,
        includeTotal,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePerform: async () => listAppointmentsAssignmentExamplePayload,
  examplePayload: listAppointmentsAssignmentExamplePayload,
});
