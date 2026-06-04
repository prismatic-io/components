import { action, type Connection, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { owner, repo } from "../inputs";

const teamsGetLegacy = action({
  display: {
    label: "Teams Get Legacy",
    description: "Get a team (Legacy)",
  },
  perform: async (context, { connection, teamId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/teams/${teamId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
  },
});

const teamsUpdateLegacy = action({
  display: {
    label: "Teams Update Legacy",
    description: "Update a team (Legacy)",
  },
  perform: async (
    context,
    {
      connection,
      teamId,
      name,
      description,
      privacy,
      permission,
      parentTeamId,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(`/teams/${teamId}`, {
      name,
      description,
      privacy,
      permission,
      parent_team_id: parentTeamId,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    name: {
      label: "Name",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The name of the team",
    },
    description: {
      label: "Description",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The description of the team",
    },
    privacy: {
      label: "Privacy",
      type: "string",
      required: false,
      model: [
        { label: "Secret", value: "secret" },
        { label: "Closed", value: "closed" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The level of privacy this team should have",
    },
    permission: {
      label: "Permission",
      type: "string",
      required: false,
      default: "pull",
      model: [
        { label: "Pull", value: "pull" },
        { label: "Push", value: "push" },
        { label: "Admin", value: "admin" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "**Deprecated**",
    },
    parentTeamId: {
      label: "Parent Team Id",
      type: "string",
      required: false,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The ID of a team to set as the parent team",
    },
  },
});

const teamsDeleteLegacy = action({
  display: {
    label: "Teams Delete Legacy",
    description: "Delete a team (Legacy)",
  },
  perform: async (context, { connection, teamId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(`/teams/${teamId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
  },
});

const teamsListDiscussionsLegacy = action({
  display: {
    label: "Teams List Discussions Legacy",
    description: "List discussions (Legacy)",
  },
  perform: async (
    context,
    { connection, teamId, direction, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/teams/${teamId}/discussions`, {
      params: { direction, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    direction: {
      label: "Direction",
      type: "string",
      required: false,
      default: "desc",
      model: [
        { label: "Asc", value: "asc" },
        { label: "Desc", value: "desc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The direction to sort the results by",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const teamsCreateDiscussionLegacy = action({
  display: {
    label: "Teams Create Discussion Legacy",
    description: "Create a discussion (Legacy)",
  },
  perform: async (context, { connection, teamId, title, body, isPrivate }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(`/teams/${teamId}/discussions`, {
      title,
      body,
      private: isPrivate,
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    title: {
      label: "Title",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The discussion post"s title',
    },
    body: {
      label: "Body",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The discussion post"s body text',
    },
    isPrivate: {
      label: "Private",
      type: "boolean",
      required: false,
      default: "false",
      clean: (value) => util.types.toBool(value) || undefined,
      comments:
        "Private posts are only visible to team members, organization owners, and team maintainers",
    },
  },
});

const teamsGetDiscussionLegacy = action({
  display: {
    label: "Teams Get Discussion Legacy",
    description: "Get a discussion (Legacy)",
  },
  perform: async (context, { connection, teamId, discussionNumber }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/teams/${teamId}/discussions/${discussionNumber}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
  },
});

const teamsUpdateDiscussionLegacy = action({
  display: {
    label: "Teams Update Discussion Legacy",
    description: "Update a discussion (Legacy)",
  },
  perform: async (
    context,
    { connection, teamId, discussionNumber, title, body },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/teams/${teamId}/discussions/${discussionNumber}`,
      {
        title,
        body,
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    title: {
      label: "Title",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The discussion post"s title',
    },
    body: {
      label: "Body",
      type: "string",
      required: false,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The discussion post"s body text',
    },
  },
});

const teamsDeleteDiscussionLegacy = action({
  display: {
    label: "Teams Delete Discussion Legacy",
    description: "Delete a discussion (Legacy)",
  },
  perform: async (context, { connection, teamId, discussionNumber }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/teams/${teamId}/discussions/${discussionNumber}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
  },
});

const teamsListDiscussionCommentsLegacy = action({
  display: {
    label: "Teams List Discussion Comments Legacy",
    description: "List discussion comments (Legacy)",
  },
  perform: async (
    context,
    { connection, teamId, discussionNumber, direction, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/teams/${teamId}/discussions/${discussionNumber}/comments`,
      { params: { direction, per_page: perPage, page } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    direction: {
      label: "Direction",
      type: "string",
      required: false,
      default: "desc",
      model: [
        { label: "Asc", value: "asc" },
        { label: "Desc", value: "desc" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The direction to sort the results by",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const teamsCreateDiscussionCommentLegacy = action({
  display: {
    label: "Teams Create Discussion Comment Legacy",
    description: "Create a discussion comment (Legacy)",
  },
  perform: async (context, { connection, teamId, discussionNumber, body }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/teams/${teamId}/discussions/${discussionNumber}/comments`,
      { body },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    body: {
      label: "Body",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The discussion comment"s body text',
    },
  },
});

const teamsGetDiscussionCommentLegacy = action({
  display: {
    label: "Teams Get Discussion Comment Legacy",
    description: "Get a discussion comment (Legacy)",
  },
  perform: async (
    context,
    { connection, teamId, discussionNumber, commentNumber },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/teams/${teamId}/discussions/${discussionNumber}/comments/${commentNumber}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    commentNumber: {
      label: "Comment Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the comment",
    },
  },
});

const teamsUpdateDiscussionCommentLegacy = action({
  display: {
    label: "Teams Update Discussion Comment Legacy",
    description: "Update a discussion comment (Legacy)",
  },
  perform: async (
    context,
    { connection, teamId, discussionNumber, commentNumber, body },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/teams/${teamId}/discussions/${discussionNumber}/comments/${commentNumber}`,
      { body },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    commentNumber: {
      label: "Comment Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the comment",
    },
    body: {
      label: "Body",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: 'The discussion comment"s body text',
    },
  },
});

const teamsDeleteDiscussionCommentLegacy = action({
  display: {
    label: "Teams Delete Discussion Comment Legacy",
    description: "Delete a discussion comment (Legacy)",
  },
  perform: async (
    context,
    { connection, teamId, discussionNumber, commentNumber },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/teams/${teamId}/discussions/${discussionNumber}/comments/${commentNumber}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    commentNumber: {
      label: "Comment Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the comment",
    },
  },
});

const reactionsListForTeamDiscussionCommentLegacy = action({
  display: {
    label: "Reactions List For Team Discussion Comment Legacy",
    description: "List reactions for a team discussion comment (Legacy)",
  },
  perform: async (
    context,
    {
      connection,
      teamId,
      discussionNumber,
      commentNumber,
      content,
      perPage,
      page,
    },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/teams/${teamId}/discussions/${discussionNumber}/comments/${commentNumber}/reactions`,
      { params: { content, per_page: perPage, page } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    commentNumber: {
      label: "Comment Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the comment",
    },
    content: {
      label: "Content",
      type: "string",
      required: false,
      model: [
        { label: "1", value: "+1" },
        { label: "1", value: "-1" },
        { label: "Laugh", value: "laugh" },
        { label: "Confused", value: "confused" },
        { label: "Heart", value: "heart" },
        { label: "Hooray", value: "hooray" },
        { label: "Rocket", value: "rocket" },
        { label: "Eyes", value: "eyes" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Returns a single [reaction type](https://docs",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reactionsCreateForTeamDiscussionCommentLegacy = action({
  display: {
    label: "Reactions Create For Team Discussion Comment Legacy",
    description: "Create reaction for a team discussion comment (Legacy)",
  },
  perform: async (
    context,
    { connection, teamId, discussionNumber, commentNumber, content },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/teams/${teamId}/discussions/${discussionNumber}/comments/${commentNumber}/reactions`,
      { content },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    commentNumber: {
      label: "Comment Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the comment",
    },
    content: {
      label: "Content",
      type: "string",
      required: true,
      model: [
        { label: "1", value: "+1" },
        { label: "1", value: "-1" },
        { label: "Laugh", value: "laugh" },
        { label: "Confused", value: "confused" },
        { label: "Heart", value: "heart" },
        { label: "Hooray", value: "hooray" },
        { label: "Rocket", value: "rocket" },
        { label: "Eyes", value: "eyes" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The [reaction type](https://docs",
    },
  },
});

const reactionsListForTeamDiscussionLegacy = action({
  display: {
    label: "Reactions List For Team Discussion Legacy",
    description: "List reactions for a team discussion (Legacy)",
  },
  perform: async (
    context,
    { connection, teamId, discussionNumber, content, perPage, page },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/teams/${teamId}/discussions/${discussionNumber}/reactions`,
      { params: { content, per_page: perPage, page } },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    content: {
      label: "Content",
      type: "string",
      required: false,
      model: [
        { label: "1", value: "+1" },
        { label: "1", value: "-1" },
        { label: "Laugh", value: "laugh" },
        { label: "Confused", value: "confused" },
        { label: "Heart", value: "heart" },
        { label: "Hooray", value: "hooray" },
        { label: "Rocket", value: "rocket" },
        { label: "Eyes", value: "eyes" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Returns a single [reaction type](https://docs",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const reactionsCreateForTeamDiscussionLegacy = action({
  display: {
    label: "Reactions Create For Team Discussion Legacy",
    description: "Create reaction for a team discussion (Legacy)",
  },
  perform: async (
    context,
    { connection, teamId, discussionNumber, content },
  ) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.post(
      `/teams/${teamId}/discussions/${discussionNumber}/reactions`,
      { content },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    discussionNumber: {
      label: "Discussion Number",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number that identifies the discussion",
    },
    content: {
      label: "Content",
      type: "string",
      required: true,
      model: [
        { label: "1", value: "+1" },
        { label: "1", value: "-1" },
        { label: "Laugh", value: "laugh" },
        { label: "Confused", value: "confused" },
        { label: "Heart", value: "heart" },
        { label: "Hooray", value: "hooray" },
        { label: "Rocket", value: "rocket" },
        { label: "Eyes", value: "eyes" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The [reaction type](https://docs",
    },
  },
});

const teamsListPendingInvitationsLegacy = action({
  display: {
    label: "Teams List Pending Invitations Legacy",
    description: "List pending team invitations (Legacy)",
  },
  perform: async (context, { connection, teamId, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/teams/${teamId}/invitations`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const teamsListMembersLegacy = action({
  display: {
    label: "Teams List Members Legacy",
    description: "List team members (Legacy)",
  },
  perform: async (context, { connection, teamId, role, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/teams/${teamId}/members`, {
      params: { role, per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    role: {
      label: "Role",
      type: "string",
      required: false,
      default: "all",
      model: [
        { label: "Member", value: "member" },
        { label: "Maintainer", value: "maintainer" },
        { label: "All", value: "all" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "Filters members returned by their role in the team",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const teamsGetMemberLegacy = action({
  display: {
    label: "Teams Get Member Legacy",
    description: "Get team member (Legacy)",
  },
  perform: async (context, { connection, teamId, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/teams/${teamId}/members/${username}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const teamsAddMemberLegacy = action({
  display: {
    label: "Teams Add Member Legacy",
    description: "Add team member (Legacy)",
  },
  perform: async (context, { connection, teamId, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/teams/${teamId}/members/${username}`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const teamsRemoveMemberLegacy = action({
  display: {
    label: "Teams Remove Member Legacy",
    description: "Remove team member (Legacy)",
  },
  perform: async (context, { connection, teamId, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/teams/${teamId}/members/${username}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const teamsGetMembershipForUserLegacy = action({
  display: {
    label: "Teams Get Membership For User Legacy",
    description: "Get team membership for a user (Legacy)",
  },
  perform: async (context, { connection, teamId, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/teams/${teamId}/memberships/${username}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const teamsAddOrUpdateMembershipForUserLegacy = action({
  display: {
    label: "Teams Add Or Update Membership For User Legacy",
    description: "Add or update team membership for a user (Legacy)",
  },
  perform: async (context, { connection, teamId, username, role }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/teams/${teamId}/memberships/${username}`,
      { role },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
    role: {
      label: "Role",
      type: "string",
      required: false,
      default: "member",
      model: [
        { label: "Member", value: "member" },
        { label: "Maintainer", value: "maintainer" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The role that this user should have in the team",
    },
  },
});

const teamsRemoveMembershipForUserLegacy = action({
  display: {
    label: "Teams Remove Membership For User Legacy",
    description: "Remove team membership for a user (Legacy)",
  },
  perform: async (context, { connection, teamId, username }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/teams/${teamId}/memberships/${username}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    username: {
      label: "Username",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The handle for the GitHub user account",
    },
  },
});

const teamsListProjectsLegacy = action({
  display: {
    label: "Teams List Projects Legacy",
    description: "List team projects (Legacy)",
  },
  perform: async (context, { connection, teamId, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/teams/${teamId}/projects`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const teamsCheckPermissionsForProjectLegacy = action({
  display: {
    label: "Teams Check Permissions For Project Legacy",
    description: "Check team permissions for a project (Legacy)",
  },
  perform: async (context, { connection, teamId, projectId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/teams/${teamId}/projects/${projectId}`);
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    projectId: {
      label: "Project Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the project",
    },
  },
});

const teamsAddOrUpdateProjectPermissionsLegacy = action({
  display: {
    label: "Teams Add Or Update Project Permissions Legacy",
    description: "Add or update team project permissions (Legacy)",
  },
  perform: async (context, { connection, teamId, projectId, permission }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/teams/${teamId}/projects/${projectId}`,
      { permission },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    projectId: {
      label: "Project Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the project",
    },
    permission: {
      label: "Permission",
      type: "string",
      required: false,
      model: [
        { label: "Read", value: "read" },
        { label: "Write", value: "write" },
        { label: "Admin", value: "admin" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The permission to grant to the team for this project",
    },
  },
});

const teamsRemoveProjectLegacy = action({
  display: {
    label: "Teams Remove Project Legacy",
    description: "Remove a project from a team (Legacy)",
  },
  perform: async (context, { connection, teamId, projectId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/teams/${teamId}/projects/${projectId}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    projectId: {
      label: "Project Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the project",
    },
  },
});

const teamsListReposLegacy = action({
  display: {
    label: "Teams List Repos Legacy",
    description: "List team repositories (Legacy)",
  },
  perform: async (context, { connection, teamId, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/teams/${teamId}/repos`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

const teamsCheckPermissionsForRepoLegacy = action({
  display: {
    label: "Teams Check Permissions For Repo Legacy",
    description: "Check team permissions for a repository (Legacy)",
  },
  perform: async (context, { connection, teamId, owner, repo }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/teams/${teamId}/repos/${owner}/${repo}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    owner,
    repo,
  },
});

const teamsAddOrUpdateRepoPermissionsLegacy = action({
  display: {
    label: "Teams Add Or Update Repo Permissions Legacy",
    description: "Add or update team repository permissions (Legacy)",
  },
  perform: async (context, { connection, teamId, owner, repo, permission }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.put(
      `/teams/${teamId}/repos/${owner}/${repo}`,
      { permission },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    owner,
    repo,
    permission: {
      label: "Permission",
      type: "string",
      required: false,
      model: [
        { label: "Pull", value: "pull" },
        { label: "Push", value: "push" },
        { label: "Admin", value: "admin" },
      ],
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The permission to grant the team on this repository",
    },
  },
});

const teamsRemoveRepoLegacy = action({
  display: {
    label: "Teams Remove Repo Legacy",
    description: "Remove a repository from a team (Legacy)",
  },
  perform: async (context, { connection, teamId, owner, repo }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.delete(
      `/teams/${teamId}/repos/${owner}/${repo}`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    owner,
    repo,
  },
});

const teamsListIdpGroupsForLegacy = action({
  display: {
    label: "Teams List Idp Groups For Legacy",
    description: "List IdP groups for a team (Legacy)",
  },
  perform: async (context, { connection, teamId }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(
      `/teams/${teamId}/team-sync/group-mappings`,
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
  },
});

const teamsCreateOrUpdateIdpGroupConnectionsLegacy = action({
  display: {
    label: "Teams Create Or Update Idp Group Connections Legacy",
    description: "Create or update IdP group connections (Legacy)",
  },
  perform: async (context, { connection, teamId, groups, syncedAt }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.patch(
      `/teams/${teamId}/team-sync/group-mappings`,
      {
        groups,
        synced_at: syncedAt,
      },
    );
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    groups: {
      label: "Groups",
      type: "string",
      required: true,
      clean: (value) => util.types.toString(value) || undefined,
      comments: "The IdP groups you want to connect to a GitHub team",
    },
    syncedAt: {
      label: "Synced At",
      type: "string",
      required: false,
      example: '"I am not a timestamp"',
      clean: (value) => util.types.toString(value) || undefined,
    },
  },
});

const teamsListChildLegacy = action({
  display: {
    label: "Teams List Child Legacy",
    description: "List child teams (Legacy)",
  },
  perform: async (context, { connection, teamId, perPage, page }) => {
    const client = createClient(connection as Connection, context.debug.enabled);
    const { data } = await client.get(`/teams/${teamId}/teams`, {
      params: { per_page: perPage, page },
    });
    return { data };
  },
  inputs: {
    connection: {
      label: "Connection",
      type: "connection",
      required: true,
    },
    teamId: {
      label: "Team Id",
      type: "string",
      required: true,
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The unique identifier of the team",
    },
    perPage: {
      label: "Per Page",
      type: "string",
      default: "30",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "The number of results per page (max 100)",
    },
    page: {
      label: "Page",
      type: "string",
      default: "1",
      clean: (value) => util.types.toNumber(value) || undefined,
      comments: "Page number of the results to fetch",
    },
  },
});

export default {
  teamsGetLegacy,
  teamsUpdateLegacy,
  teamsDeleteLegacy,
  teamsListDiscussionsLegacy,
  teamsCreateDiscussionLegacy,
  teamsGetDiscussionLegacy,
  teamsUpdateDiscussionLegacy,
  teamsDeleteDiscussionLegacy,
  teamsListDiscussionCommentsLegacy,
  teamsCreateDiscussionCommentLegacy,
  teamsGetDiscussionCommentLegacy,
  teamsUpdateDiscussionCommentLegacy,
  teamsDeleteDiscussionCommentLegacy,
  reactionsListForTeamDiscussionCommentLegacy,
  reactionsCreateForTeamDiscussionCommentLegacy,
  reactionsListForTeamDiscussionLegacy,
  reactionsCreateForTeamDiscussionLegacy,
  teamsListPendingInvitationsLegacy,
  teamsListMembersLegacy,
  teamsGetMemberLegacy,
  teamsAddMemberLegacy,
  teamsRemoveMemberLegacy,
  teamsGetMembershipForUserLegacy,
  teamsAddOrUpdateMembershipForUserLegacy,
  teamsRemoveMembershipForUserLegacy,
  teamsListProjectsLegacy,
  teamsCheckPermissionsForProjectLegacy,
  teamsAddOrUpdateProjectPermissionsLegacy,
  teamsRemoveProjectLegacy,
  teamsListReposLegacy,
  teamsCheckPermissionsForRepoLegacy,
  teamsAddOrUpdateRepoPermissionsLegacy,
  teamsRemoveRepoLegacy,
  teamsListIdpGroupsForLegacy,
  teamsCreateOrUpdateIdpGroupConnectionsLegacy,
  teamsListChildLegacy,
};
