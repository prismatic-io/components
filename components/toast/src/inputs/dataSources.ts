import { input, util } from "@prismatic-io/spectral";
import { connection, restaurantExternalId } from "./shared";

const restaurantExternalIdWithoutDs = {
  ...restaurantExternalId,
  dataSource: undefined,
};

export const selectEmployeeInputs = {
  connection,
  restaurantExternalId: restaurantExternalIdWithoutDs,
};

export const selectJobInputs = selectEmployeeInputs;

const startDate = input({
  label: "Start Date (Required)",
  type: "string",
  required: true,
  comments:
    "Start date and time of time period to match shifts. A shift matches the time period if the shift inDate is after (inclusive) the specified Start Date and the shift Out Date is before the End Date (exclusive). The specified period cannot be longer than one month.",
  example: "2015-10-10T06:00:00.000+0000",
  placeholder: "2015-10-10T06:00:00.000+0000",
  clean: util.types.toString,
});

const endDate = input({
  label: "End Date (Required)",
  type: "string",
  required: true,
  comments:
    "End date and time of time period to match shifts. A shift matches the time period if the shift inDate is after (inclusive) the specified Start Date and the shift Out Date is before the End Date (exclusive). The specified period cannot be longer than one month.",
  example: "2015-10-10T12:00:00.000+0000",
  placeholder: "2015-10-10T12:00:00.000+0000",
  clean: util.types.toString,
});

export const selectShiftInputs = {
  connection,
  restaurantExternalId: restaurantExternalIdWithoutDs,
  startDate,
  endDate,
};

const timeEntryStartDate = input({
  label: "Start Date (Required)",
  type: "string",
  required: true,
  comments:
    "Start date and time of time period to match time entries. A time entry matches the time period if its clock-in inDate is after (inclusive) the specified Start Date and before (exclusive) the End Date. The specified period cannot be longer than one month.",
  example: "2015-10-10T06:00:00.000+0000",
  placeholder: "2015-10-10T06:00:00.000+0000",
  clean: util.types.toString,
});

const timeEntryEndDate = input({
  label: "End Date (Required)",
  type: "string",
  required: true,
  comments:
    "End date and time of time period to match time entries. A time entry matches the time period if its clock-in inDate is after (inclusive) the specified Start Date and before (exclusive) the End Date. The specified period cannot be longer than one month.",
  example: "2015-10-10T12:00:00.000+0000",
  placeholder: "2015-10-10T12:00:00.000+0000",
  clean: util.types.toString,
});

export const selectTimeEntryInputs = {
  connection,
  restaurantExternalId: restaurantExternalIdWithoutDs,
  startDate: timeEntryStartDate,
  endDate: timeEntryEndDate,
};

export const selectConnectedRestaurantInputs = { connection };

export const selectAccesibleRestaurantInputs = selectConnectedRestaurantInputs;
