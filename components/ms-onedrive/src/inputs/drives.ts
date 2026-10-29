import { input } from "@prismatic-io/spectral";
import { cleanString } from "../util/clean";
import { fetchAll, oneDriveConnection, pageLimit, pageToken } from "./common";
import { siteId } from "./sites";
import { userId } from "./users";

export const driveId = input({
  label: "Drive",
  type: "string",
  required: true,
  example: "b!t18F8ybsHUq1z3LTz8xvZqP8zaSWjkFNhsME-Fepo75dTf9vQKfeRblBZjoSQrd7",
  placeholder: "Enter drive ID",
  comments: "The unique identifier of the drive.",
  dataSource: "listDrives",
  clean: cleanString,
});

const groupId = input({
  label: "Group",
  type: "string",
  required: true,
  example: "b320ee12-b1cd-4cca-b648-a437be61c5cd",
  placeholder: "Enter group ID",
  comments: "The unique identifier of the Microsoft 365 group.",
  dataSource: "listGroups",
  clean: cleanString,
});

export const listDrivesInputs = {
  connection: oneDriveConnection,
  fetchAll,
  pageLimit,
  pageToken,
};

export const listDrivesByUserInputs = {
  connection: oneDriveConnection,
  userId,
  fetchAll,
  pageLimit,
  pageToken,
};

export const listDrivesByGroupInputs = {
  connection: oneDriveConnection,
  groupId,
  fetchAll,
  pageLimit,
  pageToken,
};

export const listDrivesBySiteInputs = {
  connection: oneDriveConnection,
  siteId,
  fetchAll,
  pageLimit,
  pageToken,
};

export const getDriveInputs = {
  connection: oneDriveConnection,
  driveId,
};
