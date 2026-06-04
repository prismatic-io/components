import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTechnicianResponse } from "../../examplePayloads";
import {
  aadUserId,
  accountCreationMethod,
  address,
  bio,
  burdenRate,
  businessUnitId,
  connection,
  customFields,
  dailyGoal,
  email,
  jobFilter,
  jobHistoryDateFilter,
  licenseType,
  login,
  memo,
  name,
  password,
  phoneNumber,
  positions,
  roleId,
  team,
} from "../../inputs";

export const createTechnician = action({
  display: {
    label: "Create Technician",
    description: "Create new technician",
  },
  inputs: {
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
    team,
    dailyGoal,
    burdenRate,
    bio,
    memo: {
      ...memo,
      comments: "Memo for the technician",
    },
    jobFilter,
    jobHistoryDateFilter,
    home: {
      ...address,
      comments: "The home address of the technician",
    },
    customFields: {
      ...customFields,
      comments: "Custom fields for the technician",
    },
  },
  perform: async (
    context,
    {
      connection,
      aadUserId,
      accountCreationMethod,
      bio,
      burdenRate,
      businessUnitId,
      customFields,
      dailyGoal,
      email,
      home,
      jobFilter,
      jobHistoryDateFilter,
      licenseType,
      login,
      memo,
      name,
      password,
      phoneNumber,
      positions,
      roleId,
      team,
    },
  ) => {
    const client = createClient(connection, "settings", context.debug.enabled);
    const { data } = await client.post(`/technicians`, {
      aadUserId,
      accountCreationMethod,
      bio,
      burdenRate,
      businessUnitId,
      customFields,
      dailyGoal,
      email,
      home,
      jobFilter,
      jobHistoryDateFilter,
      licenseType,
      login,
      memo,
      name,
      password,
      phoneNumber,
      positions,
      roleId,
      team,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: createTechnicianResponse,
  },
});
