export const ENDPOINTS = {
  EMPLOYEES_CHANGED: "/v1/employees/changed",
  EMPLOYEES_DIRECTORY: "/v1/employees/directory",
  WEBHOOKS: "/v1/webhooks",
  FILES_VIEW: "/v1/files/view",
};

export const GATEWAY_URL = "https://api.bamboohr.com/api/gateway.php";

export const MESSAGES = {
  CATEGORY_CREATED: "Category created successfully.",
  CATEGORY_NOT_CREATED: "Request processed but no categories were created.",
  ROW_ADDED: "Row added successfully.",
};

export const DEFAULT_BATCH_SIZE = 50;
export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;

export const MAX_RETRIES = 3;
export const RETRYABLE_STATUS_CODES = [429];
export const SAFE_RETRY_METHODS = ["get", "head", "options"];
export const ERROR_MESSAGE_HEADER = "x-bamboohr-error-message";

export const EMPLOYEE_FIELDS = [
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
