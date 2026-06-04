import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { bookingDatasource } from "../examplePayloads";
import { connection } from "../inputs";
import type { Booking } from "../interfaces";

export const selectBooking = dataSource({
  display: {
    label: "Select Booking",
    description:
      "Select a booking from a dropdown menu (up to 10,000 bookings)",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, "crm");
    let bookings: Booking[] = [];
    let cursor = false;
    let page = 1;

    do {
      const { data } = await client.get(`/bookings`, {
        params: {
          includeTotal: true,
          page,
          pageSize: 1000,
        },
      });
      bookings = [...bookings, ...data.data];
      cursor = data.hasMore;
      page++;
    } while (cursor && page < 10);

    
    const objects = bookings
      .sort((a, b) => (a.name < b.name ? -1 : 1))
      .map<Element>((booking) => ({
        key: booking.id.toString(),
        label: `${booking.name} (ID: ${booking.id})`,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: bookingDatasource,
  },
});
