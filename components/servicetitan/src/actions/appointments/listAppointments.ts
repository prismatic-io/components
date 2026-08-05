import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAppointmentsExamplePayload } from "../../examplePayloads";
import { listAppointmentsInputs } from "../../inputs";
import type { Appointment } from "../../types";
import { fetchAllRecords } from "../../util";
export const listAppointments = action({
  display: {
    label: "List Appointments",
    description: "Retrieve a list of appointments",
  },
  inputs: listAppointmentsInputs,
  perform: async (
    context,
    { connection, pagination, includeTotal, sort, customQueryParams, fetchAll },
  ) => {
    const client = createClient(connection, "jpm", context.debug.enabled);
    if (fetchAll) {
      const data = await fetchAllRecords<Appointment>(client, "/appointments", {
        includeTotal,
        sort,
        ...customQueryParams,
      });
      return {
        data,
      };
    }
    const { data } = await client.get(`/appointments`, {
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
  examplePayload: listAppointmentsExamplePayload,
});
