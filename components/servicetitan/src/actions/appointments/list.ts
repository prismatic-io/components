import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listAppointmentsResponse } from "../../examplePayloads";
import {
  connection,
  customQueryParams,
  fetchAll,
  includeTotal,
  page,
  pageSize,
  sort,
} from "../../inputs";
import type { Appointment } from "../../interfaces";
import { fetchAllRecords } from "../../util";

export const listAppointments = action({
  display: {
    label: "List Appointments",
    description: "Retrieve a list of appointments",
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
    data: listAppointmentsResponse,
  },
});
