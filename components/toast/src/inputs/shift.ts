import { input, util } from "@prismatic-io/spectral";
import {
  cleanCodeInput,
  cleanStringInput,
  cleanValueListInput,
} from "../utils";
import { additionalFields, connection, restaurantExternalId } from "./shared";

const documentationComment =
  "See [Toast API documentation](https://doc.toasttab.com/openapi/labor/tag/Data-definitions/schema/Shift/) for more information.";

const externalId = input({
  label: "External ID",
  type: "string",
  required: false,
  comments:
    "External identifier string that is prefixed by the naming authority.",
  example: "MyToastNamingAuthority:1234",
  placeholder: "MyToastNamingAuthority:1234",
  clean: cleanStringInput,
});

const jobReference = input({
  label: "Job Reference",
  type: "code",
  language: "json",
  example: JSON.stringify(
    {
      guid: "678758d1-6aa8-494c-be55-0614f761d160",
      externalId: "",
      entityType: "RestaurantJob",
    },
    null,
    2,
  ),
  comments: `A wrapper object with fields that allow reference to a Toast platform entity by Toast GUID. ${documentationComment}`,
  required: false,
  clean: (value) => cleanCodeInput(value, "Job Reference"),
});

const employeeReference = input({
  label: "Employee Reference",
  type: "code",
  language: "json",
  example: JSON.stringify(
    {
      guid: "7030407f-761c-4d92-86d9-4e84bc700d0f",
      externalId: "",
      entityType: "RestaurantUser",
    },
    null,
    2,
  ),
  comments: `A wrapper object with fields that allow reference to a Toast platform entity by Toast GUID. ${documentationComment}`,
  required: true,
  clean: (value) => cleanCodeInput(value, "Employee Reference"),
});

const inDate = input({
  label: "In Date",
  type: "string",
  required: true,
  comments:
    "Timestamp of the beginning of the shift. This is when the employee can clock in. Expressed in the UTC time zone.",
  example: "2015-10-10T06:00:00.000+0000",
  placeholder: "2015-10-10T06:00:00.000+0000",
  clean: util.types.toString,
});

const outDate = input({
  label: "Out Date",
  type: "string",
  required: true,
  comments:
    "Timestamp of the end of the shift. This is when the employee can clock out. Expressed in the UTC time zone.",
  example: "2015-10-10T12:00:00.000+0000",
  placeholder: "2015-10-10T12:00:00.000+0000",
  clean: util.types.toString,
});

const shiftAdditionalFields = input({
  ...additionalFields,
  comments: `${additionalFields.comments} ${documentationComment}`,
  example: JSON.stringify({ externalId: "MyToastNamingAuthority" }, null, 2),
});

export const createShiftInputs = {
  connection,
  restaurantExternalId,
  inDate,
  outDate,
  employeeReference,
  externalId,
  jobReference,
  additionalFields: shiftAdditionalFields,
};

const shiftId = input({
  label: "Shift ID",
  type: "string",
  required: true,
  example: "12345678-1234-1234-1234-123456789012",
  placeholder: "12345678-1234-1234-1234-123456789012",
  comments:
    "The shift identifier, either the Toast platform GUID or an external identifier.",
  clean: util.types.toString,
  dataSource: "selectShift",
});

export const deleteShiftInputs = {
  connection,
  restaurantExternalId,
  shiftId,
};

export const getShiftInputs = deleteShiftInputs;

const endDate = input({
  label: "End Date",
  type: "string",
  required: false,
  comments:
    "Optional end date and time of time period to match shifts. A shift matches the time period if the shift inDate is after (inclusive) the specified Start Date and the shift Out Date is before the End Date (exclusive). These parameters are required if the shiftIds parameter is not defined. The specified period cannot be longer than one month.",
  example: "2015-10-10T12:00:00.000+0000",
  placeholder: "2015-10-10T12:00:00.000+0000",
  clean: cleanStringInput,
});

const shiftIds = input({
  label: "Shift IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "An optional identifier that filters return values for a specific shift. The identifier can be a Toast platform GUID or an external identifier. If present, the shifts resource will only return the shifts you specify.",
  example: "12345678-1234-1234-1234-123456789012",
  placeholder: "12345678-1234-1234-1234-123456789012",
  clean: cleanValueListInput,
});

const startDate = input({
  label: "Start Date",
  type: "string",
  required: false,
  comments:
    "Optional start date and time of time period to match shifts. A shift matches the time period if the shift inDate is after (inclusive) the specified Start Date and the shift Out Date is before the End Date (exclusive). These parameters are required if the Shift Ids input is not defined. The specified period cannot be longer than one month.",
  example: "2015-10-10T06:00:00.000+0000",
  placeholder: "2015-10-10T06:00:00.000+0000",
  clean: cleanStringInput,
});

export const listShiftsInputs = {
  connection,
  restaurantExternalId,
  startDate,
  endDate,
  shiftIds,
};

export const updateShiftInputs = {
  connection,
  restaurantExternalId,
  shiftId,
  jobReference,
  employeeReference,
  inDate,
  outDate,
  additionalFields: shiftAdditionalFields,
};
