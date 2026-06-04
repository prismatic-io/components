import { input, util } from "@prismatic-io/spectral";
import {
  cleanArrayCodeInput,
  cleanStringInput,
  cleanValueListInput,
} from "../utils";
import { additionalFields, connection, restaurantExternalId } from "./shared";

const documentationComment =
  "See [Toast API documentation](https://doc.toasttab.com/openapi/labor/tag/Data-definitions/schema/Employee/) for more information.";

const email = input({
  label: "Email",
  type: "string",
  comments: "Employee's email address.",
  required: true,
  example: "example@email.com",
  placeholder: "example@email.com",
  clean: util.types.toString,
});

const firstName = input({
  label: "First Name",
  type: "string",
  comments: "First name of the employee.",
  required: true,
  example: "John",
  placeholder: "John",
  clean: util.types.toString,
});

const chosenName = input({
  label: "Chosen Name",
  type: "string",
  comments:
    "Optional, chosen name of the employee. To be used, when appropriate, in place of first name.",
  required: false,
  example: "Johnny",
  placeholder: "Johnny",
  clean: cleanStringInput,
});

const lastName = input({
  label: "Last Name",
  type: "string",
  comments: "Last name of the employee.",
  required: true,
  example: "Doe",
  placeholder: "Doe",
  clean: util.types.toString,
});

const externalId = input({
  label: "External ID",
  type: "string",
  comments:
    "External identifier string that is prefixed by the naming authority.",
  required: false,
  example: "12345678-1234-1234-1234-123456789012",
  placeholder: "12345678-1234-1234-1234-123456789012",
  clean: cleanStringInput,
});

const externalEmployeeId = input({
  label: "External Employee ID",
  type: "string",
  comments: "Optional, employee's external ID in the Toast platform.",
  required: false,
  example: "12345678-1234-1234-1234-123456789012",
  placeholder: "12345678-1234-1234-1234-123456789012",
  clean: cleanStringInput,
});

const jobReferences = input({
  label: "Job References",
  type: "code",
  language: "json",
  comments: `An array of external references to jobs assigned to this employee. ${documentationComment}`,
  required: false,
  example: JSON.stringify(
    [
      {
        guid: "f290a951-2042-4f3d-b861-d89e9e583876",
        entityType: "RestaurantJob",
      },
    ],
    null,
    2,
  ),
  clean: (value) => cleanArrayCodeInput(value, "Job References"),
});

const wageOverrides = input({
  label: "Wage Overrides",
  type: "code",
  language: "json",
  comments: `An optional array of per job wage overrides, where each element defines a job reference and the wage override for this employee when performing that job. ${documentationComment}`,
  required: false,
  example: JSON.stringify(
    [
      {
        jobReference: {
          guid: "f290a951-2042-4f3d-b861-d89e9e583876",
          entityType: "RestaurantJob",
        },
        wage: 10,
      },
    ],
    null,
    2,
  ),
  clean: (value) => cleanArrayCodeInput(value, "Wage Overrides"),
});

const employeeAdditionalFields = input({
  ...additionalFields,
  comments: `${additionalFields.comments} ${documentationComment}`,
  example: JSON.stringify({ phoneNumber: "555-555-5555" }, null, 2),
});

export const createEmployeeInputs = {
  connection,
  restaurantExternalId,
  email,
  firstName,
  lastName,
  chosenName,
  externalId,
  externalEmployeeId,
  jobReferences,
  wageOverrides,
  additionalFields: employeeAdditionalFields,
};

const employeeId = input({
  label: "Employee ID",
  type: "string",
  comments: "The GUID of the employee to delete.",
  required: true,
  example: "12345678-1234-1234-1234-123456789012",
  placeholder: "12345678-1234-1234-1234-123456789012",
  clean: util.types.toString,
  dataSource: "selectEmployee",
});

export const deleteEmployeeInputs = {
  connection,
  restaurantExternalId,
  employeeId,
};

export const getEmployeeInputs = {
  connection,
  restaurantExternalId,
  employeeId: input({
    ...employeeId,
    comments: "The GUID of the employee to retrieve.",
  }),
};

const employeeIds = input({
  label: "Employee IDs",
  type: "string",
  collection: "valuelist",
  comments:
    "An optional identifier that filters return values for a specific employee. The identifier can be a Toast platform GUID or an external identifier.",
  required: false,
  example: "12345678-1234-1234-1234-123456789012",
  placeholder: "12345678-1234-1234-1234-123456789012",
  clean: cleanValueListInput,
});

export const listEmployeesInputs = {
  connection,
  restaurantExternalId,
  employeeIds,
};

const passcode = input({
  label: "Passcode",
  type: "string",
  comments:
    "The passcode for access to Toast POS devices. When updating the passcode, you must include the current passcode in the Current Passcode value.",
  required: false,
  example: "1234",
  placeholder: "1234",
  clean: cleanStringInput,
});

const currentPasscode = input({
  label: "Current Passcode",
  type: "string",
  comments:
    "The employee's current passcode. Required when updating the passcode.",
  required: false,
  example: "1234",
  placeholder: "1234",
  clean: cleanStringInput,
});

export const updateEmployeeInputs = {
  connection,
  restaurantExternalId,
  employeeId,
  firstName: input({ ...firstName, required: false, clean: cleanStringInput }),
  chosenName,
  lastName: input({ ...lastName, required: false, clean: cleanStringInput }),
  externalEmployeeId,
  passcode,
  currentPasscode,
  additionalFields: employeeAdditionalFields,
};
