import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import {
  connectionInput,
  pagination,
  searchString,
  timeout,
  userId,
} from "./common";
const username = input({
  label: "Username",
  type: "string",
  required: false,
  comments:
    "The username of the user. For Tableau Online, this value is an email address.",
  example: "someone@example.com",
  placeholder: "Enter username",
  clean: toOptionalString,
});
const siteRole = input({
  label: "Site Role",
  type: "string",
  required: false,
  comments: "The role assigned to the user on the site.",
  example: "Explorer",
  clean: toOptionalString,
  model: [
    { label: "Creator", value: "Creator" },
    { label: "Explorer", value: "Explorer" },
    { label: "Explorer Can Publish", value: "ExplorerCanPublish" },
    {
      label: "Site Administrator Explorer",
      value: "SiteAdministratorExplorer",
    },
    { label: "Site Administrator Creator", value: "SiteAdministratorCreator" },
    { label: "Unlicensed", value: "Unlicensed" },
    { label: "Viewer", value: "Viewer" },
  ],
});
const authSetting = input({
  label: "Auth Setting",
  type: "string",
  required: false,
  comments: "The authentication method used to sign the user in.",
  example: "ServerDefault",
  clean: toOptionalString,
  model: [
    { label: "SAML", value: "SAML" },
    { label: "Server Default", value: "ServerDefault" },
    { label: "TabID WITH MFA", value: "TABID_WITH_MFA" },
    { label: "OpenId", value: "OpenID" },
  ],
});
const userSearchField = input({
  label: "Search Field",
  type: "string",
  required: true,
  comments:
    "The field to search. Dates should follow the ISO format: 2016-05-04T21:24:49Z",
  example: "Name",
  clean: util.types.toString,
  model: [
    { label: "Username", value: "name" },
    { label: "Last Login", value: "lastLogin" },
    { label: "Site Role", value: "siteRole" },
  ],
});
export const listUsersInputs = {
  timeout,
  pagination,
  tableauConnection: connectionInput,
};
export const searchUsersInputs = {
  searchField: userSearchField,
  searchString: { ...searchString, example: "john.doe@test.com" },
  timeout,
  tableauConnection: connectionInput,
  pagination,
};
export const getUserInputs = {
  userId,
  timeout,
  tableauConnection: connectionInput,
};
export const deleteUserInputs = {
  userId,
  timeout,
  tableauConnection: connectionInput,
};
export const createUserInputs = {
  username,
  siteRole,
  authSetting,
  timeout,
  tableauConnection: connectionInput,
};
export const updateUserInputs = {
  userId,
  username,
  siteRole,
  authSetting,
  timeout,
  tableauConnection: connectionInput,
};
