import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  listTeamsExamplePayload,
  listJoinedTeamsExamplePayload,
  listMembersExamplePayload,
  getMemberExamplePayload,
  addMemberExamplePayload,
} from "../examplePayloads";
import {
  allowCreateUpdateChannels,
  allowGiphy,
  allowUserDeleteMessages,
  allowUserEditMessages,
  channelDescription,
  channelName,
  connection,
  fetchAll,
  filter,
  giphyContentRating,
  memberId,
  orderBy,
  roles,
  select,
  skipToken,
  teamDescription,
  teamId,
  teamName,
  timeout,
  top,
  userId,
  userPrincipalName,
  visibility,
} from "../inputs";
import { getUserPath, paginateResults } from "../utils";

const listTeams = action({
  display: {
    label: "List Teams",
    description: "List all teams",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );

    const data = await paginateResults(client, "/groups", params.fetchAll, {
      $filter:
        params.filter || "resourceProvisioningOptions/Any(x:x eq 'Team')",
      $top: params.top,
      $skipToken: params.skipToken,
      $orderby: params.orderBy,
      $select: params.select,
    });

    return { data };
  },
  inputs: {
    connection,
    fetchAll,
    timeout,
    filter,
    top,
    skipToken,
    orderBy,
    select,
  },
  examplePayload: listTeamsExamplePayload,
});

const listJoinedTeams = action({
  display: {
    label: "List Joined Teams",
    description: "List the teams you have joined",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );

    const data = await paginateResults(
      client,
      `${getUserPath(params.userPrincipalName)}/joinedTeams`,
      params.fetchAll,
      {
        $filter: params.filter,
        $top: params.top,
        $skipToken: params.skipToken,
        $select: params.select,
      },
    );

    return { data };
  },
  inputs: {
    connection,
    fetchAll,
    userPrincipalName,
    timeout,
    filter,
    top,
    skipToken,
    select,
  },
  examplePayload: listJoinedTeamsExamplePayload,
});

const listMembers = action({
  display: {
    label: "List Team Members",
    description: "List all the members in a team",
  },
  perform: async (
    context,
    { connection, teamId, timeout, fetchAll, top, skipToken, filter, select },
  ) => {
    const client = await createClient(
      connection,
      timeout,
      context.debug.enabled,
    );

    const data = await paginateResults(
      client,
      `/teams/${teamId}/members`,
      fetchAll,
      {
        $filter: filter,
        $top: top,
        $skipToken: skipToken,
        $select: select,
      },
    );

    return { data };
  },
  inputs: {
    connection,
    fetchAll,
    teamId,
    timeout,
    filter,
    top,
    skipToken,
    select,
  },
  examplePayload: listMembersExamplePayload,
});

const removeMember = action({
  display: {
    label: "Remove Team Member",
    description: "Remove a user from a provided team",
  },
  perform: async (context, { connection, teamId, memberId, timeout }) => {
    const client = await createClient(
      connection,
      timeout,
      context.debug.enabled,
    );

    const { data } = await client.delete(
      `/teams/${teamId}/members/${memberId}`,
    );
    return { data };
  },
  inputs: { connection, teamId, memberId, timeout },
});

const getMember = action({
  display: {
    label: "Get Member",
    description: "Get information or metadata about a team member",
  },
  perform: async (context, { connection, teamId, memberId, timeout }) => {
    const client = await createClient(
      connection,
      timeout,
      context.debug.enabled,
    );
    const { data } = await client.get(`/teams/${teamId}/members/${memberId}`);
    return { data };
  },
  inputs: { connection, teamId, memberId, timeout },
  examplePayload: getMemberExamplePayload,
});

const archiveTeam = action({
  display: {
    label: "Archive Team",
    description: "Archive the specified team",
  },
  perform: async (context, { connection, teamId, timeout }) => {
    const client = await createClient(
      connection,
      timeout,
      context.debug.enabled,
    );
    const { data } = await client.post(`/teams/${teamId}/archive`);
    return { data };
  },
  inputs: { connection, teamId, timeout },
});

const addMember = action({
  display: {
    label: "Add Team Member",
    description: "Add a new member to the team",
  },
  perform: async (context, { connection, teamId, roles, userId, timeout }) => {
    const client = await createClient(
      connection,
      timeout,
      context.debug.enabled,
    );
    const { data } = await client.post(`/teams/${teamId}/members`, {
      "@odata.type": "#microsoft.graph.aadUserConversationMember",
      roles,
      "user@odata.bind": `https://graph.microsoft.com/v1.0/users('${userId}')`,
    });
    return { data };
  },
  examplePayload: addMemberExamplePayload,
  inputs: { connection, teamId, roles, userId, timeout },
});

const createTeam = action({
  display: {
    label: "Create Team",
    description: "Create a new team",
  },
  perform: async (
    context,
    {
      connection,
      visibility,
      teamName,
      teamDescription,
      channelName,
      channelDescription,
      allowCreateUpdateChannels,
      allowUserDeleteMessages,
      allowUserEditMessages,
      allowGiphy,
      giphyContentRating,
      timeout,
    },
  ) => {
    const client = await createClient(
      connection,
      timeout,
      context.debug.enabled,
    );

    const payload = {
      "template@odata.bind": `https://graph.microsoft.com/v1.0/teamsTemplates('standard')`,
      visibility: visibility,
      displayName: teamName,
      description: teamDescription,
      channels: [
        {
          displayName: channelName,
          isFavoriteByDefault: true,
          description: channelDescription,
        },
      ],
      memberSettings: {
        allowCreateUpdateChannels,
        allowDeleteChannels: true,
        allowAddRemoveApps: true,
        allowCreateUpdateRemoveTabs: true,
        allowCreateUpdateRemoveConnectors: true,
      },
      guestSettings: {
        allowCreateUpdateChannels: false,
        allowDeleteChannels: false,
      },
      funSettings: {
        allowGiphy: allowGiphy,
        giphyContentRating: giphyContentRating,
        allowStickersAndMemes: true,
        allowCustomMemes: true,
      },
      messagingSettings: {
        allowUserEditMessages,
        allowUserDeleteMessages,
        allowOwnerDeleteMessages: true,
        allowTeamMentions: true,
        allowChannelMentions: true,
      },
      discoverySettings: {
        showInTeamsSearchAndSuggestions: true,
      },
    };

    const { data } = await client.post("/teams", payload);
    return { data };
  },
  inputs: {
    connection,
    visibility,
    teamName,
    channelName,
    channelDescription,
    teamDescription,
    allowCreateUpdateChannels,
    allowUserDeleteMessages,
    allowUserEditMessages,
    allowGiphy,
    giphyContentRating,
    timeout,
  },
});

const getTeam = action({
  display: {
    label: "Get Team",
    description: "Get information or metadata of a team",
  },
  perform: async (context, { connection, teamId, timeout }) => {
    const client = await createClient(
      connection,
      timeout,
      context.debug.enabled,
    );
    const { data } = await client.get(`/teams/${teamId}`);
    return { data };
  },
  inputs: { connection, teamId, timeout },
});

const updateTeam = action({
  display: {
    label: "Update Team",
    description: "Update an existing team",
  },
  perform: async (
    context,
    {
      connection,
      teamId,
      visibility,
      teamName,
      teamDescription,
      allowCreateUpdateChannels,
      allowUserDeleteMessages,
      allowUserEditMessages,
      allowGiphy,
      giphyContentRating,
      timeout,
    },
  ) => {
    const client = await createClient(
      connection,
      timeout,
      context.debug.enabled,
    );
    const { data } = await client.patch(`/teams/${teamId}`, {
      displayName: teamName,
      description: teamDescription,
      visibility,
      memberSettings: {
        allowCreateUpdateChannels,
      },
      messagingSettings: {
        allowUserEditMessages,
        allowUserDeleteMessages,
      },
      funSettings: {
        allowGiphy,
        giphyContentRating,
      },
    });
    return { data };
  },
  inputs: {
    connection,
    teamId,
    visibility,
    teamName: { ...teamName, required: false },
    teamDescription: { ...teamDescription, required: false },
    allowCreateUpdateChannels,
    allowUserDeleteMessages,
    allowUserEditMessages,
    allowGiphy,
    giphyContentRating,
    timeout,
  },
});

const listTeamsApps = action({
  display: {
    label: "List Teams Apps",
    description: "List apps from the Microsoft Teams app catalog",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );
    const { data } = await client.get("/appCatalogs/teamsApps", {
      params: {
        $top: params.top || undefined,
        $skipToken: params.skipToken || undefined,
        $filter: params.filter || undefined,
        $orderby: params.orderBy || undefined,
        $select: params.select || undefined,
      },
    });
    return { data };
  },
  inputs: {
    connection,
    timeout,
    top,
    skipToken,
    filter,
    orderBy,
    select,
  },
});

export default {
  listTeams,
  listJoinedTeams,
  listMembers,
  removeMember,
  getMember,
  archiveTeam,
  addMember,
  createTeam,
  getTeam,
  updateTeam,
  listTeamsApps,
};
