import { dataSource, type Element } from "@prismatic-io/spectral";
import { createToastClient } from "../client";
import { selectShiftInputs as inputs } from "../inputs/dataSources";

export const selectShift = dataSource({
  display: {
    label: "Select Shift",
    description: "Select a shift from a list of shifts.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (
    _context,
    { connection, restaurantExternalId, startDate, endDate },
  ) => {
    const client = await createToastClient(
      connection,
      false,
      restaurantExternalId,
    );

    if (!startDate || !endDate) {
      throw new Error(
        "Start Date and End Date inputs for Select Shift Data Source are required",
      );
    }

    const { data } = await client.get(`/labor/v1/shifts`, {
      params: {
        endDate,
        startDate,
      },
    });

    const objects = (
      data as { guid: string; inDate: string; outDate: string }[]
    ).map<Element>((shift) => ({
      key: shift.guid,
      label: `${new Date(shift.inDate).toLocaleString()} - ${new Date(shift.outDate).toLocaleString()}`,
    }));

    return { result: objects };
  },
});
