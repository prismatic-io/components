import { input, structuredObjectInput } from "@prismatic-io/spectral";
import {
  cleanNumberInput,
  cleanStringInput,
  cleanStringValueListInput,
  mapModelValues,
} from "../util";
import {
  address,
  businessUnitId,
  connection,
  customFields,
  customQueryParams,
  fetchAll,
  includeTotal,
  memo,
  name,
  page,
  pageSize,
  sort,
  technicianId,
} from "./common";
const phoneNumber = input({
  label: "Phone Number",
  type: "string",
  example: "1234567890",
  required: false,
  comments: "Technician's phone number",
  placeholder: "1234567890",
  clean: cleanStringInput,
});
const email = input({
  label: "Email",
  type: "string",
  example: "test@technician.us",
  required: false,
  comments: "Technician's email address",
  placeholder: "test@technician.us",
  clean: cleanStringInput,
});
const login = input({
  label: "Login Username",
  type: "string",
  example: "technician_us",
  required: false,
  comments: "Technician's username",
  placeholder: "technician_us",
  clean: cleanStringInput,
});
const password = input({
  label: "Password",
  type: "string",
  example: "@an1pwd123",
  required: false,
  comments: "Technician's password",
  placeholder: "@an1pwd123",
  clean: cleanStringInput,
});
const accountCreationMethod = input({
  label: "Account Creation Method",
  type: "string",
  required: true,
  comments: "Account creation method",
  model: mapModelValues(
    ["CreateLater", "SendInvite", "AssignLoginAndPassword"],
    true,
  ),
  clean: cleanStringInput,
  default: "",
});
const roleId = input({
  label: "Role ID",
  type: "string",
  example: "7",
  required: true,
  comments: "User role Id",
  placeholder: "7",
  clean: cleanNumberInput,
  dataSource: "selectUserRole",
});
const positions = input({
  label: "Positions",
  type: "string",
  required: true,
  collection: "valuelist",
  comments: "List of company positions",
  model: mapModelValues(
    [
      "Installer",
      "Service",
      "Sales",
      "Maintenance",
      "Helper",
      "InstallProductionManager",
      "ServiceManager",
      "SalesManager",
      "PartRunner",
      "DummyTech",
    ],
    true,
  ),
  clean: cleanStringValueListInput,
});
const aadUserId = input({
  label: "Azure Active Directory User Id",
  type: "string",
  example: "6B29FC40-CA47-1067-B31D-00DD010662DA",
  required: false,
  comments: "Azure Active Directory User Id",
  placeholder: "6B29FC40-CA47-1067-B31D-00DD010662DA",
  clean: cleanStringInput,
});
const licenseType = input({
  label: "License Type",
  type: "string",
  required: true,
  comments: "License type",
  model: mapModelValues(
    ["NonManagedTech", "ManagedTech", "ManagedInstaller"],
    true,
  ),
  clean: cleanStringInput,
  default: "",
});
const team = input({
  label: "Team",
  type: "string",
  example: "Test Team",
  required: false,
  comments: "Team name",
  placeholder: "Test Team",
  clean: cleanStringInput,
});
const dailyGoal = input({
  label: "Daily Goal",
  type: "string",
  example: "5.6",
  required: false,
  comments: "Daily revenue goal",
  placeholder: "5.6",
  clean: cleanNumberInput,
});
const burdenRate = input({
  label: "Burden Rate",
  type: "string",
  example: "5.6",
  required: false,
  comments: "Burden rate (hourly)",
  placeholder: "5.6",
  clean: cleanNumberInput,
});
const bio = input({
  label: "Biography",
  type: "string",
  example: "Biography",
  required: false,
  comments: "Biography of the technician",
  placeholder: "Biography",
  clean: cleanStringInput,
});
const jobFilter = input({
  label: "Job Filter",
  type: "string",
  required: false,
  comments: "Upcoming appointment visibility",
  model: mapModelValues(
    [
      "AllScheduledDispatchedWorking",
      "NextScheduledDispatchedWorking",
      "DispatchedWorking",
      "NextScheduledDispatchedWorkingToday",
      "AllScheduledDispatchedWorkingToday",
      "AllScheduledDispatchedWorkingFiveDays",
      "NextScheduledDispatchedWorkingTodayTomorrow",
      "AllScheduledDispatchedWorkingTodayTomorrow",
      "Next2ScheduledDispatchedWorkingToday",
    ],
    true,
  ),
  clean: cleanStringInput,
  default: "",
});
const jobHistoryDateFilter = input({
  label: "Job History Date Filter",
  type: "string",
  required: false,
  comments: "Appointment history visibility",
  model: mapModelValues(
    ["AllJobs", "LastThreeDays", "LastSevenDays", "LastMonth"],
    true,
  ),
  clean: cleanStringInput,
  default: "",
});
const technicianAdditionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments: "Additional optional fields.",
  inputs: {
    team,
    dailyGoal,
    burdenRate,
    bio,
    jobFilter,
    jobHistoryDateFilter,
  },
});
export const createTechnicianInputs = {
  connection,
  name: {
    ...name,
    comments: "The name of the technician",
  },
  accountCreationMethod,
  roleId,
  positions,
  licenseType,
  phoneNumber,
  email,
  login,
  password,
  businessUnitId: {
    ...businessUnitId,
    comments:
      "The ID of the business unit to which the technician will be assigned",
  },
  aadUserId,
  memo: {
    ...memo,
    comments: "Memo for the technician",
  },
  additionalFields: technicianAdditionalFields,
  home: {
    ...address,
    comments: "The home address of the technician",
  },
  customFields: {
    ...customFields,
    comments: "Custom fields for the technician",
  },
};
export const getTechnicianInputs = {
  connection,
  technicianId: {
    ...technicianId,
    required: true,
    comments: "The ID of the Technician to retrieve",
  },
};
export const listTechniciansInputs = {
  connection,
  fetchAll,
  page,
  pageSize,
  includeTotal,
  sort,
  customQueryParams,
};
export const updateTechnicianInputs = {
  connection,
  technicianId: {
    ...technicianId,
    required: true,
    comments: "The ID of the technician to update",
  },
  name: {
    ...name,
    required: false,
    comments: "The name of the technician",
  },
  phoneNumber,
  email,
  login,
  businessUnitId: {
    ...businessUnitId,
    comments:
      "The ID of the business unit to which the technician will be assigned",
  },
  roleId: {
    ...roleId,
    required: false,
  },
  positions: {
    ...positions,
    required: false,
  },
  aadUserId,
  licenseType: {
    ...licenseType,
    required: false,
  },
  memo: {
    ...memo,
    comments: "Memo for the technician",
  },
  additionalFields: technicianAdditionalFields,
  home: {
    ...address,
    comments: "The home address of the technician",
  },
  customFields: {
    ...customFields,
    comments: "Custom fields for the technician",
  },
};
