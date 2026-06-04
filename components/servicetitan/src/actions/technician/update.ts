import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTechnicianResponse as updateTechnicianResponse } from "../../examplePayloads";
import {
  aadUserId,
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
  phoneNumber,
  positions,
  roleId,
  team,
  technicianId,
} from "../../inputs";

export const updateTechnician = action({
  display: {
    label: "Update Technician",
    description: "Update a technician",
  },
  inputs: {
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
      phoneNumber,
      positions,
      roleId,
      team,
      technicianId,
    },
  ) => {
    const client = createClient(connection, "settings", context.debug.enabled);
    const { data } = await client.patch(`/technicians/${technicianId}`, {
      aadUserId,
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
    data: updateTechnicianResponse,
  },
});
