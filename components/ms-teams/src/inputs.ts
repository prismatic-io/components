import { util, input } from "@prismatic-io/spectral";
import { cleanObject, cleanString } from "./utils";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const groupId = input({
  label: "Group",
  type: "string",
  required: true,
  example: "37635f8e-82d1-example-8ba4-af6e8985427f",
  comments: "Provide a string value for the group Id",
  clean: (param) => util.types.toString(param),
});

export const teamId = input({
  label: "Team",
  type: "string",
  required: true,
  example: "37635f8e-82d1-example-8ba4-af6e8985427f",
  comments:
    "Provide an identifier of the given team. This value should be an Id.",
  clean: (param) => util.types.toString(param) || undefined,
  dataSource: "teamNames",
});

export const appId = input({
  label: "App ID",
  type: "string",
  required: true,
  example: "b1c5353a-7aca-41b3-830f-27d5218fe0e5",
  comments: "Provide the ID of the app to install.",
  clean: util.types.toString,
});

export const appInstallationId = input({
  label: "App Installation ID",
  type: "string",
  required: true,
  example:
    "MjljY2Q5NTctNGEzYi00ATI4LTllYmYtZjAyNWRkMTQzMmFhIyMwZTNiZWRtYS00NzIwLTQ4YjUtOWUxMy01YTFjZTEzODdkNDU=",
  comments: "Provide the Installation ID of the app to remove.",
  clean: util.types.toString,
});

export const memberId = input({
  label: "Member",
  type: "string",
  required: true,
  example: "37635f8e-82d1-example-8ba4-af6e8985427f",
  comments:
    "Provide the identifier of a given member. This value should be a memberId.",
  clean: (param) => util.types.toString(param) || undefined,
});

export const visibility = input({
  label: "Visibility",
  type: "string",
  model: [
    { label: "Private", value: "private" },
    { label: "Public", value: "public" },
  ],
  default: "public",
  required: true,
  comments: "The visibility of the group and team. Defaults to Public.",
});

export const teamName = input({
  label: "Team Name",
  type: "string",
  required: true,
  example: "myTeam",
  comments: "Provide a string value for the team name.",
});

export const teamDescription = input({
  label: "Team Description",
  type: "string",
  required: true,
  example: "This is an example description.",
  comments: "Provide a string value for the description.",
});

export const template = input({
  label: "Template",
  type: "string",
  required: true,
  default: "standard",
  comments:
    "Select from a list of templates provided by Microsoft. See a full list of the available templates here: https://docs.microsoft.com/en-us/microsoftteams/get-started-with-teams-templates",
});

export const channelName = input({
  label: "Channel Name",
  type: "string",
  required: true,
  example: "myChannel",
  comments: "Provide a string value for the channel name.",
});

export const channelDescription = input({
  label: "Channel Description",
  type: "string",
  required: true,
  example: "This is an example description",
  comments: "Provide a string value for the channel description.",
});

export const allowCreateUpdateChannels = input({
  label: "Allow users to create/update channels",
  type: "boolean",
  required: false,
  comments:
    "This flag will give users the permission to create/update channels.",
});

export const allowUserEditMessages = input({
  label: "Allow users to edit messages",
  type: "boolean",
  comments: "This flag will give users the permission to edit messages.",
  required: false,
});

export const allowUserDeleteMessages = input({
  label: "Allow users to delete messages",
  type: "boolean",
  required: false,
  comments: "This flag will give users the permission to delete messages.",
});

export const roles = input({
  label: "Roles",
  type: "string",
  collection: "valuelist",
  comments:
    "For each item, provide a string value containing a role you would like to assign the user.",
  example: "owner",
  required: false,
});

export const allowGiphy = input({
  label: "Allow Giphy",
  type: "boolean",
  comments: "This flag will enable the use of Giphy content in your team.",
  required: false,
});

export const giphyContentRating = input({
  label: "Giphy Content Rating",
  type: "string",
  model: [
    { label: "Moderate", value: "moderate" },
    { label: "Strict", value: "strict" },
  ],
  required: false,
});

export const userId = input({
  label: "User Id",
  type: "string",
  example: "37635f8e-82d1-example-8ba4-af6e8985427f",
  comments: "Provide a string value for the Id of the user.",
  required: true,
  clean: (param) => util.types.toString(param),
  dataSource: "userNames",
});

export const channelId = input({
  label: "Channel Id",
  type: "string",
  example: "37635f8e-82d1-example-8ba4-af6e8985427f",
  comments: "Provide a string value for the channel Id",
  required: true,
  clean: (param) => util.types.toString(param),
  dataSource: "channelNames",
});

export const membershipType = input({
  label: "Membership Type",
  type: "string",
  model: [
    {
      label: "standard",
      value: "standard",
    },
    {
      label: "private",
      value: "private",
    },
  ],
  required: true,
  comments:
    "The type of the channel. Can be set during creation and can't be changed. Possible values are: standard - Channel inherits the list of members of the parent team; private - Channel can have members that are a subset of all the members on the parent team.",
});

export const message = input({
  label: "Message",
  type: "string",
  example: "Hello World!",
  required: true,
  comments: "Provide a string value for the message to send.",
  clean: util.types.toString,
});

export const timeout = input({
  label: "Timeout",
  type: "string",
  example: "30000",
  required: false,
  comments:
    "The maximum time a client will await a response in milliseconds (defaults to 30000ms)",
  clean: (value) => util.types.toInt(value, 30000),
});

export const changeType = input({
  label: "Change Type",
  type: "string",
  required: true,
  comments: "Provide a comma separated list of changes you want to listen for.",
  example: "created/updated",
  clean: util.types.toString,
});

export const notificationUrl = input({
  label: "Notification URL",
  type: "string",
  required: true,
  comments:
    "Provide a valid URL representing where you want the request to be directed to.",
  example: "https://hooks.example.com/EXAMPLE",
  clean: util.types.toString,
});

export const webhookResource = input({
  label: "Resource",
  type: "string",
  required: true,
  comments:
    "Provide a string value for the type of resource you want to listen to.",
  example: "teams/getAllMessages",
  clean: util.types.toString,
});

export const expirationDateTime = input({
  label: "Expiration Date Time",
  type: "string",
  required: false,
  comments: "Provide a valid date time for the expiration of the webhook.",
  example: "2021-10-21T14:55:45.0000000Z",
});

export const top = input({
  label: "Top",
  type: "string",
  required: false,
  comments:
    "Provide an integer value for the maximum amount of results that will be returned. Provide a value from 1 to 100.",
  example: "20",
  clean: (param) => util.types.toNumber(param) || undefined,
});

export const skipToken = input({
  label: "Page Offset",
  type: "string",
  required: false,
  comments:
    "Provide an integer value for the page offset for the given object's results.",
  example: "3",
  clean: (param) => util.types.toString(param) || undefined,
});


export const contentType = input({
  label: "Content Type",
  model: [
    { label: "HTML", value: "html" },
    { label: "Text", value: "text" },
  ],
  type: "string",
  required: false,
  default: "text",
  comments: "Provide a value for the content type of the message",
});

export const displayName = input({
  label: "Display Name",
  type: "string",
  required: true,
  comments: "Provide a string value for the display name of the resource.",
  example: "My Group",
  clean: (param) => util.types.toString(param),
});

export const securityEnabled = input({
  label: "Security Enabled",
  type: "string",
  required: true,
  comments: "Determines if security will be enabled on the group.",
  default: "true",
  clean: (param) => util.types.toBool(param),
});

export const description = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "Provide a string value for the description.",
  example: "This is an example description",
  clean: (param) => util.types.toString(param),
});

export const fields = input({
  label: "Fields",
  type: "string",
  collection: "keyvaluelist",
  required: false,
  comments: "Optional fields to include in the request body",
});

export const filter = input({
  label: "Filter",
  type: "string",
  required: false,
  comments: "Filters results (rows), uses the OData V4 query language.",
  example: "startswith(givenName,'J')",
  clean: (param) => util.types.toString(param) || undefined,
});

export const webinarId = input({
  label: "Webinar ID",
  type: "string",
  required: true,
  clean: (param) => util.types.toString(param) || undefined,
  dataSource: "webinarNames",
});

export const sessionId = input({
  label: "Session ID",
  type: "string",
  required: true,
  clean: (param) => util.types.toString(param) || undefined,
  dataSource: "selectWebinarSession",
});

export const select = input({
  label: "Select",
  type: "string",
  required: false,
  comments: "Filters properties (columns), uses the OData V4 query language.",
  example: "givenName,surname",
  clean: (param) => util.types.toString(param) || undefined,
});

export const expand = input({
  label: "Expand",
  type: "string",
  required: false,
  comments: "Expand returned entities, uses the OData V4 query language.",
  example: "teamsAppDefinition",
  clean: (param) => util.types.toString(param) || undefined,
});

export const search = input({
  label: "Search",
  type: "string",
  required: false,
  comments: "Returns results based on search criteria.",
  example: "Search For This",
  clean: (param) => util.types.toString(param) || undefined,
});

export const cardPayload = input({
  label: "Card Payload",
  type: "data",
  required: true,
  placeholder: "Adaptive Card Payload",
  comments: "Adaptive Card payload to send",
});

export const importance = input({
  label: "Importance",
  type: "string",
  default: "normal",
  model: [
    { label: "Normal", value: "normal" },
    { label: "High", value: "high" },
    { label: "Urgent", value: "urgent" },
  ],
});

export const userPrincipalName = input({
  label: "User Principal Name",
  type: "string",
  required: false,
  comments:
    "Provide the principal name or ID of the user. Required for non-delegated App connections.",
  example: "user@example.onmicrosoft.com",
  placeholder: "user@example.onmicrosoft.com",
  clean: cleanString,
});

export const webinarDisplayName = {
  ...displayName,
  comments: "Provide a string value for the display name of the webinar.",
  example: "My Webinar",
  required: true,
};

export const webinarDescriptionContentType = input({
  label: "Description Content Type",
  type: "string",
  required: true,
  model: [
    { label: "Text", value: "text" },
    { label: "HTML", value: "html" },
  ],
  comments: "The content type for the webinar description.",
  clean: util.types.toString,
});

export const webinarDescriptionContent = input({
  label: "Description Content",
  type: "string",
  required: true,
  comments: "The description content for the webinar.",
  example: "This is a description for the webinar.",
  clean: util.types.toString,
});

export const webinarStartDateTime = input({
  label: "Start Date",
  type: "string",
  required: true,
  comments: "The start date and time for the webinar.",
  example: "2025-05-28T04:00:00",
  clean: util.types.toString,
});

export const webinarEndDateTime = input({
  label: "End Date",
  type: "string",
  required: true,
  comments: "The end date and time for the webinar.",
  example: "2025-05-28T04:00:00",
  clean: util.types.toString,
});

export const webinarTimeZone = input({
  label: "Time Zone",
  type: "string",
  required: true,
  comments: "The time zone for the webinar.",
  example: "Pacific Standard Time",
  clean: util.types.toString,
});

export const audience = input({
  label: "Audience",
  type: "string",
  required: false,
  model: [
    { label: "Everyone", value: "everyone" },
    { label: "Organization", value: "organization" },
    { label: "Unknown Future Value", value: "unknownFutureValue" },
  ],
  example: "organization",
  clean: cleanString,
});

export const coOrganizers = input({
  label: "Co-Organizers",
  type: "code",
  language: "json",
  required: false,
  example: JSON.stringify(
    [
      {
        id: "7b7e1acd-a3e0-4533-8c1d-c1a4ca0b2e2b",
        tenantId: "77229959-e479-4a73-b6e0-ddac27be315c",
      },
    ],
    null,
    2,
  ),
  clean: cleanObject,
});

export const settings = input({
  label: "Attendee Email Notification Enabled",
  type: "boolean",
  required: false,
  comments: "Enable or disable attendee email notifications for the webinar.",
  example: "false",
  clean: (value) =>
    value !== undefined
      ? { isAttendeeEmailNotificationEnabled: util.types.toBool(value) }
      : undefined,
});

export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  comments: "Set to true to retrieve all results.",
  required: false,
  clean: util.types.toBool,
});

export const orderBy = input({
  label: "Order By",
  type: "string",
  required: false,
  comments: "Order results (rows), uses the OData V4 query language.",
  example: "displayName desc",
  clean: cleanString,
});

export const role = input({
  label: "Role",
  type: "string",
  required: false,
  model: [
    { label: "Organizer", value: "organizer" },
    { label: "CoOrganizer", value: "coOrganizer" },
  ],
});
