import { input, util } from "@prismatic-io/spectral";
import { connectionInput, directoryPath, fetchAll, pagination } from "./common";
export const lookupKey = input({
  label: "Lookup By",
  type: "string",
  required: true,
  comments:
    "The kind of identifier supplied in Lookup Value, which determines how team members are matched.",
  model: [
    { label: "Email", value: "email" },
    { label: "Team Member ID", value: "team_member_id" },
    { label: "External ID", value: "external_id" },
  ],
  clean: util.types.toString,
});
export const lookupValue = input({
  label: "Lookup Value",
  placeholder: "Enter the value to look up the team member by",
  type: "string",
  required: true,
  comments:
    "The identifier to look the team member up by. Must match the kind selected in Lookup By.",
  example: "user@example.com",
  clean: util.types.toString,
});
export const getTeamMembersInputs = {
  dropboxConnection: connectionInput,
  lookupKey,
  lookupValue,
};
export const listTeamFolderInputs = {
  dropboxConnection: connectionInput,
  path: directoryPath,
  fetchAll,
  pagination,
};
