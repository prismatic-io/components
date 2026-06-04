import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { appointmentDatasource } from "../examplePayloads";
import { connection } from "../inputs";
import type { Appointment } from "../interfaces";

export const selectAppointment = dataSource({
  display: {
    label: "Select Appointment",
    description:
      "Select an Appointment from a dropdown menu (up to 10,000 Appointments)",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, "jpm");
    let appointments: Appointment[] = [];
    let cursor = false;
    let page = 1;

    do {
      const { data } = await client.get(`/appointments`, {
        params: {
          includeTotal: true,
          page,
          pageSize: 1000,
        },
      });
      appointments = [...appointments, ...data.data];
      cursor = data.hasMore;
      page++;
    } while (cursor && page < 10);

    
    const objects = appointments
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((appointment) => ({
        key: appointment.id.toString(),
        label: `#${appointment.appointmentNumber} (ID: ${appointment.id})`,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: appointmentDatasource,
  },
});
