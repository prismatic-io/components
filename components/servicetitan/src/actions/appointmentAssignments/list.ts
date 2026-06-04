import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAppointmentsAssignedResponse } from "../../examplePayloads";
import {
  connection,
  customQueryParams,
  fetchAll,
  includeTotal,
  page,
  pageSize,
  sort,
} from "../../inputs";
import type { AppointmentAssignment } from "../../interfaces";
import { fetchAllRecords } from "../../util";

export const listAppointmentsAssignment = action({
  display: {
    label: "List Appointment Assignment",
    description: "Retrieve a list of appointment assignments",
  },
  inputs: {
    connection,
    fetchAll,
    page,
    pageSize,
    includeTotal,
    sort,
    customQueryParams,
  },
  perform: async (
    context,
    {
      connection,
      page,
      pageSize,
      includeTotal,
      sort,
      customQueryParams,
      fetchAll,
    },
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
        page,
        pageSize,
        includeTotal,
        sort,
        ...customQueryParams,
      },
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: listAppointmentsAssignedResponse,
  },
});
