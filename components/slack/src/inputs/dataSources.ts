import { input, util } from "@prismatic-io/spectral";
import {
  connectionInput,
  includeImChannels,
  includeMultiPartyImchannels,
  includePrivateChannels,
  includePublicChannels,
} from "./common";
export const showChannelIdInDropdown = input({
  label: "Show Channel ID in Dropdown",
  comments:
    "When true, displays the channel ID alongside the channel name (e.g., '#my-channel (ID: C123456)').",
  type: "boolean",
  default: "false",
  clean: util.types.toBool,
});
export const showUserIdInDropdown = input({
  label: "Show User ID in Dropdown",
  comments:
    "When true, displays the user ID alongside the username (e.g., 'jane.doe (ID: U1234567890)').",
  type: "boolean",
  default: "false",
  clean: util.types.toBool,
});
export const showTeamIdInDropdown = input({
  label: "Show Team ID in Dropdown",
  comments:
    "When true, displays the team ID alongside the workspace name (e.g., 'Example Workspace (ID: T1234567890)').",
  type: "boolean",
  default: "false",
  clean: util.types.toBool,
});
export const selectChannelsInputs = {
  connection: connectionInput,
  showIdInDropdown: showChannelIdInDropdown,
  includePublicChannels,
  includePrivateChannels,
  includeMultiPartyImchannels,
  includeImChannels,
};
export const selectUsersInputs = {
  connection: connectionInput,
  showIdInDropdown: showUserIdInDropdown,
};
export const selectTeamsInputs = {
  connection: connectionInput,
  showIdInDropdown: showTeamIdInDropdown,
};
