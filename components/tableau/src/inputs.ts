import { input, util } from "@prismatic-io/spectral";
import tableauEvents from "./tableauEvents.json";

export const timeout = input({
  label: "Timeout",
  type: "string",
  required: false,
  comments: "The maximum amount of time the client will await a response.",
  example: "3000",
  clean: util.types.toInt,
});

export const projectId = input({
  label: "Project Id",
  type: "string",
  required: true,
  comments: "Provide a string value for the Id of your Tableau Project.",
  example: "f12a9855-1059-4cd7-9e6a-a4ba5089e374",
  dataSource: "selectProject",
});

export const webhookId = input({
  label: "Webhook Id",
  type: "string",
  required: true,
  comments: "The ID of the webhook.",
  example: "f12a9855-1059-4cd7-9e6a-a4ba5089e374",
  dataSource: "selectWebhook",
  clean: util.types.toString,
});

export const parentProjectId = input({
  label: "Parent Project Id",
  type: "string",
  required: false,
  comments: "Provide a string value for the id of the parent project.",
  example: "f12a9855-1059-4cd7-9e6a-a4ba5089e374",
});

export const projectName = input({
  label: "Project Name",
  type: "string",
  required: true,
  comments: "Provide a string value for the name of the project.",
  example: "MyProject",
});

export const description = input({
  label: "Description",
  type: "string",
  required: false,
  comments: "Provide a string value for the description of the project.",
  example: "This is an example description",
});

export const contentPermissions = input({
  label: "Content Permissions",
  type: "string",
  required: false,
  comments:
    "This value controls user permissions in a project. However, if the project is nested within a project, it will inherit those permissions and these settings will have no effect.",
  model: [
    { label: "Managed By Owner", value: "ManagedByOwner" },
    { label: "Locked To Project", value: "LockedToProject" },
    {
      label: "Locked To Project Without Nested",
      value: "LockedToWProjectWithoutNested",
    },
  ],
});

export const workbookId = input({
  label: "Workbook Id",
  type: "string",
  required: true,
  comments: "Provide a string value for the unique identifier of the workbook.",
  example: "f12a9855-1059-4cd7-9e6a-a4ba5089e374",
  dataSource: "selectWorkbook",
});

export const workbookName = input({
  label: "Workbook Name",
  type: "string",
  required: true,
  comments: "Provide a string value for the name of the workbook.",
  example: "My Workbook",
});

export const serverPort = input({
  label: "Server Port",
  type: "string",
  required: false,
  comments:
    "Provide a string value for the port of the server you want to connect.",
  example: "8080",
});

export const serverAddress = input({
  label: "Server Address",
  type: "string",
  required: false,
  comments:
    "Provide a string value for the address of the server you want to connect.",
  example: "192.168.0.1",
});

export const connectionName = input({
  label: "Connection Name",
  type: "string",
  required: false,
  comments: "Provide a string value for the name of the connection.",
  example: "My Example Server Connection",
});

export const connectionUsername = input({
  label: "Connection Username",
  type: "string",
  required: false,
  comments:
    "Provide a string value for the username used to authenticate the connection.",
  example: "myExampleUsername",
});

export const connectionPassword = input({
  label: "Connection Password",
  type: "string",
  required: false,
  comments:
    "Provide a value for the password used to authenticate the connection.",
  example: "mySafePassword",
});

export const embedPassword = input({
  label: "Embed Password",
  type: "boolean",
  required: false,
  comments: "Enable this flag to embed the password for the connection.",
});

export const showTabs = input({
  label: "Show Tabs",
  type: "boolean",
  required: false,
  default: "false",
  comments: "Specify true to have the updated workbook show views in tabs.",
});

export const connectionId = input({
  label: "Connection Id",
  type: "string",
  required: false,
  comments: "Provide a value for the unique identifier of the connection.",
  example: "f12a9855-1059-4cd7-9e6a-a4ba5089e374",
  dataSource: "selectConnection",
});

export const userId = input({
  label: "UserId",
  type: "string",
  required: false,
  comments: "Provide a value for the unique identifier of the user.",
  example: "f12a9855-1059-4cd7-9e6a-a4ba5089e374",
  dataSource: "selectUser",
});

export const username = input({
  label: "Username",
  type: "string",
  required: false,
  comments:
    "Provide a string value for the username of the user. For Tableau Online, this value is an email address.",
  example: "someone@example.com",
});

export const siteRole = input({
  label: "Site Role",
  type: "string",
  required: false,
  comments: "Provide a value for the role of the user.",
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

export const authSetting = input({
  label: "Auth Setting",
  type: "string",
  required: false,
  comments: "Provide a string value for the username of the user.",
  model: [
    { label: "SAML", value: "SAML" },
    { label: "Server Default", value: "ServerDefault" },
    { label: "TabID WITH MFA", value: "TABID_WITH_MFA" },
    { label: "OpenId", value: "OpenID" },
  ],
});

export const queryTaggingEnabled = input({
  label: "Query Tagging Enabled",
  type: "boolean",
  required: false,
  comments:
    "Associates a specific server log query event with the Tableau resource that made the query. ",
});

export const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  comments:
    "Provide an integer value for the maximum amount of results that will be returned.",
  example: `20`,
});

export const pageNumber = input({
  label: "Page Number",
  type: "string",
  required: false,
  comments:
    "Provide an integer value for the page offset for the given object's results.",
  example: `3`,
});

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const searchString = input({
  label: "Search",
  type: "string",
  required: true,
  comments: "Provide a string value to search on.",
  example: `My Project`,
});

export const userSearchField = input({
  label: "Search Field",
  type: "string",
  required: true,
  comments:
    "The field to search. Dates should follow the ISO format: 2016-05-04T21:24:49Z",
  example: `Name`,
  model: [
    { label: "Username", value: "name" },
    { label: "Last Login", value: "lastLogin" },
    { label: "Site Role", value: "siteRole" },
  ],
});
export const projectSearchField = input({
  label: "Search Field",
  type: "string",
  required: true,
  comments:
    "The field to search. Dates should follow the ISO format: 2016-05-04T21:24:49Z",
  example: `Name`,
  model: [
    { label: "Name", value: "name" },
    { label: "Created At", value: "createdAt" },
    { label: "Owner Domain", value: "ownerDomain" },
    { label: "Owner Name", value: "ownerName" },
    { label: "Owner Email", value: "ownerEmail" },
    { label: "Parent Project ID", value: "parentProjectId" },
  ],
});
export const workbookSearchField = input({
  label: "Search Field",
  type: "string",
  required: true,
  comments: "The field to search",
  example: `Tags`,
  model: [
    { label: "Name", value: "name" },
    { label: "Owner Name", value: "ownerName" },
    { label: "Tags", value: "tags" },
  ],
});
export const filterOperator = input({
  label: "Filter Operator",
  type: "string",
  required: true,
  comments: "The operator to use in searching",
  example: `eq`,
  model: [
    { label: "Equals", value: "eq" },
    { label: "In", value: "in" },
  ],
});

export const uploadSessionId = input({
  label: "Upload Session Id",
  type: "string",
  required: false,
  comments:
    "If you are calling this method to commit a file that was uploaded in parts, this value contains the upload session ID that was generated by a call to Initiate File Upload.",
  clean: util.types.toString,
});

export const workbookType = input({
  label: "Workbook Type",
  type: "string",
  required: false,
  comments:
    "twb or twbx to indicate whether you have uploaded a workbook file (twb) or a packaged workbook file (twbx).",
  model: [
    { label: "", value: "" },
    { label: "twb", value: "twb" },
    { label: "twbx", value: "twbx" },
  ],
  default: "",
  clean: util.types.toString,
});

export const overwrite = input({
  label: "Overwrite",
  type: "boolean",
  required: false,
  comments:
    "True to overwrite a workbook that has the same name, or false to fail if the specified workbook already exists.",
  default: "false",
  clean: util.types.toBool,
});

export const asJob = input({
  label: "As Job",
  type: "boolean",
  required: false,
  comments:
    "If false, the workbook publishing process runs as a synchronous process. If a workbook is very large, the process might time out before it finishes. If you set this value to true, the process runs asynchronously, and a job will start to perform the publishing process and return the job ID.",
  default: "false",
  clean: util.types.toBool,
});

export const skipConnectionCheck = input({
  label: "Skip Connection Check",
  type: "boolean",
  required: false,
  comments:
    "If true, then the Tableau server will not check if a non-published connection of a workbook is reachable.",
  default: "false",
  clean: util.types.toBool,
});

export const workbookXml = input({
  label: "Workbook XML",
  type: "code",
  language: "xml",
  required: true,
  example: `<tsRequest>
  <workbook name="workbook-name">
      <project id="project-id"></project>
  </workbook>
</tsRequest>`,
  clean: util.types.toString,
});

export const workbookFileContents = input({
  label: "Workbook File Contents",
  type: "data",
  required: true,
  comments: "The twbx file to upload as binary data.",
  clean: util.types.toBufferDataPayload,
});

export const apiVersion = input({
  label: "API Version",
  type: "string",
  required: false,
  comments: "The version of the Tableau API to use",
  example: "3.6",
  default: "3.6",
  clean: util.types.toString,
});

export const webhookName = input({
  label: "Webhook Name",
  type: "string",
  required: true,
  comments: "A name for the webhook.",
  example: "My Webhook",
  clean: util.types.toString,
});

export const events = input({
  label: "API Event Name",
  type: "string",
  required: true,
  comments: "The name of the Tableau event that triggers your webhook",
  clean: util.types.toString,
  model: tableauEvents.map((event) => {
    return { label: event.apiEventName, value: event.apiEventName };
  }),
});

export const webhookUrl = input({
  label: "Webhook URL",
  type: "string",
  required: true,
  comments:
    "The destination URL for the webhook. The webhook destination URL must be https and have a valid certificate.",
  example: "https://example.com/webhook",
  clean: util.types.toString,
});

export const webhookEnabled = input({
  label: "Webhook Enabled",
  type: "boolean",
  required: false,
  default: "true",
  comments:
    "If true (default), the newly created webhook is enabled. If false then the webhook will be disabled.",
  clean: util.types.toBool,
});

export const webhookDisableReason = input({
  label: "Webhook Disable Reason",
  type: "string",
  required: false,
  comments: "The reason a webhook is disabled.",
  example: "This webhook is disabled because of a reason.",
  clean: util.types.toString,
});
