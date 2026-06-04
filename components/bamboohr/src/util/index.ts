import { type KeyValuePair, util } from "@prismatic-io/spectral";
import { ENDPOINTS } from "../constants";

export const employeeFields = [
  "address1",
  "address2",
  "age",
  "bestEmail",
  "birthday",
  "city",
  "country",
  "dateOfBirth",
  "department",
  "division",
  "employeeNumber",
  "employmentHistoryStatus",
  "ethnicity",
  "exempt",
  "firstName",
  "fullName1",
  "fullName2",
  "fullName3",
  "fullName4",
  "fullName5",
  "displayName",
  "gender",
  "hireDate",
  "originalHireDate",
  "id",
  "jobTitle",
  "lastChanged",
  "lastName",
  "location",
  "maritalStatus",
  "middleName",
  "mobilePhone",
  "nationality",
  "payGroup",
  "payRate",
  "payRateEffectiveDate",
  "payType",
  "paidPer",
  "paySchedule",
  "payFrequency",
  "includeInPayroll",
  "timeTrackingEnabled",
  "ssn",
  "sin",
  "standardHoursPerWeek",
  "state",
  "stateCode",
  "status",
  "supervisor",
  "supervisorEmail",
  "terminationDate",
  "workEmail",
  "workPhone",
  "zipcode",
];

export const validateFields = (
  fieldValues: KeyValuePair<unknown>[],
  fieldList: string[],
) => {
  const values = util.types.keyValPairListToObject(fieldValues);
  const invalid = Object.keys(values).filter((key) => !fieldList.includes(key));
  if (invalid.length > 0) {
    throw new Error(`Invalid fields specified: ${invalid.join(", ")}`);
  }
  return values;
};

export const validateEmployeeFields = (
  fieldValues: KeyValuePair<unknown>[],
) => {
  return validateFields(fieldValues, employeeFields);
};

const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
export const validateDate = (val) => {
  const dateString = util.types.toString(val);
  if (dateRegex.test(dateString)) {
    return dateString;
  }
  throw new Error(`Date value "${dateString}" must follow YYYY-MM-DD format.`);
};

export const filterFalseyValues = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, value]) => Boolean(value)));










export const fetchChangedEmployeesSince = async (
  client: import("@prismatic-io/spectral/dist/clients/http").HttpClient,
  since: string,
): Promise<import("../types").EmployeeChange[]> => {
  const { data } = await client.get(
    `${ENDPOINTS.EMPLOYEES_CHANGED}?since=${encodeURIComponent(since)}`,
  );
  const employees = data?.employees;
  if (!employees || typeof employees !== "object") return [];
  return Object.entries(employees as Record<string, unknown>).map(
    ([id, change]) => {
      const entry = (change ?? {}) as {
        action?: string;
        lastChanged?: string;
      };
      return {
        id,
        action: entry.action as import("../types").EmployeeChange["action"],
        lastChanged: entry.lastChanged ?? "",
      };
    },
  );
};







export const partitionChangedEmployees = (
  changes: import("../types").EmployeeChange[],
): {
  created: import("../types").EmployeeChange[];
  updated: import("../types").EmployeeChange[];
} => {
  const created: import("../types").EmployeeChange[] = [];
  const updated: import("../types").EmployeeChange[] = [];
  for (const change of changes) {
    if (change.action === "Inserted") created.push(change);
    else updated.push(change);
  }
  return { created, updated };
};
