import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll, odataParams } from "./common";
import { intent, mobileAppId, settings, target } from "./mobileApps";
const mobileAppAssignmentId = input({
  label: "Mobile App Assignment ID",
  comments: "Unique Identifier for the mobile app assignment to get.",
  example: "0177548a-548a-0177-8a54-77018a547701",
  placeholder: "Enter mobile app assignment ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  dataSource: "selectMobileAppAssignment",
});
export const createMobileAppAssignmentInputs = {
  connection,
  mobileAppId: {
    ...mobileAppId,
    comments: "The ID of the mobile app to create the assignment for.",
  },
  intent,
  target,
  settings,
};
export const deleteMobileAppAssignmentInputs = {
  connection,
  mobileAppId: {
    ...mobileAppId,
    comments: "The ID of the mobile app to delete the assignment from.",
  },
  mobileAppAssignmentId: {
    ...mobileAppAssignmentId,
    comments: "The ID of the mobile app assignment to delete.",
  },
};
export const getMobileAppAssignmentInputs = {
  connection,
  mobileAppId,
  mobileAppAssignmentId,
};
export const listMobileAppAssignmentsInputs = {
  connection,
  mobileAppId,
  fetchAll,
  ...odataParams,
};
export const updateMobileAppAssignmentInputs = {
  connection,
  mobileAppId: {
    ...mobileAppId,
    comments: "The ID of the mobile app to update the assignment from.",
  },
  mobileAppAssignmentId: {
    ...mobileAppAssignmentId,
    comments: "The ID of the mobile app assignment to update.",
  },
  intent,
  target,
  settings,
};
