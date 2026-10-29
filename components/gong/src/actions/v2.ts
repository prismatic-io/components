import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";

const processRule = action({
  allowsBranching: true,
  display: {
    label: "Process Rule",
    description: "Process the defined rule",
  },
  perform: async (context, { connection }) => {
    const _client = createClient(connection, context.debug.enabled);
    await Promise.resolve();
    return { data: {}, branch: "Process" };
  },
  staticBranchNames: ["Success", "Error", "Skip"],
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    event: input({
      label: "Event to Process",
      type: "data",
      required: true,
    }),
    rules: input({
      label: "Automation Rules",
      type: "jsonForm",
      required: true,
    }),
  },
});

const addCallUsingPost = action({
  display: {
    label: "Add Call",
    description: "Add new call (/v2/calls)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v2/calls`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const addCallRecordingUsingPut = action({
  display: {
    label: "Add Call Recording",
    description: "Add call media (/v2/calls/[id]/media)",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/v2/calls/${id}/media`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    id: input({
      label: "Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "callId returned from 'Add New Call' request",
    }),
  },
});

const listCallsExtensiveUsingPost = action({
  display: {
    label: "List Calls Extensive",
    description:
      "Retrieve detailed call data by various filters (/v2/calls/extensive)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v2/calls/extensive`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const listPermissionProfileUsingGet = action({
  display: {
    label: "List Permission Profile",
    description:
      "List all company permission profiles for a given workspace (/v2/all-permission-profiles)",
  },
  perform: async (context, { connection, workspaceId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/all-permission-profiles`, {
      params: { workspaceId },
    });
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    workspaceId: input({
      label: "Workspace Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments:
        "Workspace identifier, the API will return only the profiles belonging to this workspace",
    }),
  },
});

const listCrmCallsManualAssociationUsingGet = action({
  display: {
    label: "List Crm Calls Manual Association",
    description:
      "List all calls that were manually associated with CRM objects (/v2/calls/manual-crm-associations) in Beta Phase",
  },
  perform: async (context, { connection, cursor, fromDateTime }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/calls/manual-crm-associations`, {
      params: { cursor, fromDateTime },
    });
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    cursor: input({
      label: "Cursor",
      type: "string",
      required: false,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments:
        "When paging is needed, provide the value supplied by the previous API call to bring the following page of records",
    }),
    fromDateTime: input({
      label: "From Date Time",
      type: "string",
      required: false,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments:
        "Association time filter - only the associations made after that time will be listed",
    }),
  },
});

const getCallTranscriptsUsingPost = action({
  display: {
    label: "Get Call Transcripts",
    description:
      "Retrieve transcripts of calls by date or callIds (/v2/calls/transcript)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v2/calls/transcript`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const getUsersAccessToCallsUsingGet = action({
  display: {
    label: "Get Users Access To Calls",
    description:
      "Retrieve users that have specific individual access to calls (/v2/calls/users-access)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/calls/users-access`);
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const addUsersAccessToCallsUsingPut = action({
  display: {
    label: "Add Users Access To Calls",
    description:
      "Give individual users access to calls (/v2/calls/users-access)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/v2/calls/users-access`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const deleteUsersAccessToCallsUsingDelete = action({
  display: {
    label: "Delete Users Access To Calls",
    description:
      "Remove specific individual users access from calls (/v2/calls/users-access)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/v2/calls/users-access`);
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const deleteGenericCrmIntegrationUsingDelete = action({
  display: {
    label: "Delete Generic Crm Integration",
    description:
      "Delete a Generic CRM integration (/v2/crm/integration/delete)",
  },
  perform: async (context, { connection, clientRequestId, integrationId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/v2/crm/integration/delete`, {
      params: { clientRequestId, integrationId },
    });
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    clientRequestId: input({
      label: "Client Request Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments:
        "A unique identifier sent by you to allow troubleshooting requests",
    }),
    integrationId: input({
      label: "Integration Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Integration ID generated when creating the integration",
    }),
  },
});

const listGenericCrmIntegrationUsingGet = action({
  display: {
    label: "List Generic Crm Integration",
    description:
      "Get Generic CRM integration details (/v2/crm/integration/list)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/crm/integration/list`);
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const registerGenericCrmIntegrationUsingPut = action({
  display: {
    label: "Register Generic Crm Integration",
    description: "Register a Generic CRM integration (/v2/crm/integration/new)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/v2/crm/integration/new`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const mapCrmUsersUsingPost = action({
  display: {
    label: "Map Crm Users",
    description: "Map Users (Deprecated)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v2/crm/map/users`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const uploadCrmDataUsingPost = action({
  display: {
    label: "Upload Crm Data",
    description: "Upload CRM objects (/v2/crm/object/entities)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v2/crm/object/entities`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const getCrmObjectsUsingGet = action({
  display: {
    label: "Get Crm Objects",
    description: "Get CRM objects (/v2/crm/object/list)",
  },
  perform: async (context, { connection, integrationId, objectType }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/crm/object/list`, {
      params: { integrationId, objectType },
    });
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    integrationId: input({
      label: "Integration Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Integration ID generated when creating the integration",
    }),
    objectType: input({
      label: "Object Type",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Requested objects type",
    }),
  },
});

const uploadCrmSchemaFieldUsingPost = action({
  display: {
    label: "Upload Crm Schema Field",
    description: "Upload Object Schema (/v2/crm/object/schema)",
  },
  perform: async (context, { connection, integrationId, objectType }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/v2/crm/object/schema`,
      {},
      { params: { integrationId, objectType } },
    );
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    integrationId: input({
      label: "Integration Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Integration ID generated when creating the integration",
    }),
    objectType: input({
      label: "Object Type",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Type of object to set the schema for (case-sensitive)",
    }),
  },
});

const listCrmSchemaFieldsUsingGet = action({
  display: {
    label: "List Crm Schema Fields",
    description: "List Schema Fields (/v2/crm/object/schema/list)",
  },
  perform: async (context, { connection, integrationId, objectType }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/crm/object/schema/list`, {
      params: { integrationId, objectType },
    });
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    integrationId: input({
      label: "Integration Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Integration ID generated when creating the integration",
    }),
    objectType: input({
      label: "Object Type",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments:
        "Type of object to retrieve the schema fields for (case-sensitive)",
    }),
  },
});

const getRequestStatusUsingGet = action({
  display: {
    label: "Get Request Status",
    description: "Get Request Status (/v2/crm/request-status)",
  },
  perform: async (context, { connection, clientRequestId, integrationId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/crm/request-status`, {
      params: { clientRequestId, integrationId },
    });
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    clientRequestId: input({
      label: "Client Request Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments:
        'clientRequestId sent to "/map/users", "/object/entities" or "/integration/delete" API',
    }),
    integrationId: input({
      label: "Integration Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Integration ID generated when creating the integration",
    }),
  },
});

const uploadStagesUsingPost = action({
  display: {
    label: "Upload Stages",
    description: "Upload Stages (Deprecated)",
  },
  perform: async (context, { connection, integrationId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/v2/crm/stages`,
      {},
      { params: { integrationId } },
    );
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    integrationId: input({
      label: "Integration Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Integration ID generated when creating the integration",
    }),
  },
});

const customActionUsingPut = action({
  display: {
    label: "Custom Action",
    description:
      "Report event of a custom action (/v2/customer-engagement/action)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/v2/customer-engagement/action`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const contentSharedUsingPut = action({
  display: {
    label: "Content Shared",
    description:
      "Report event of a content share (/v2/customer-engagement/content/shared)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/v2/customer-engagement/content/shared`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const contentViewedUsingPut = action({
  display: {
    label: "Content Viewed",
    description:
      "Report event of a content view (/v2/customer-engagement/content/viewed)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/v2/customer-engagement/content/viewed`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const findAllReferencesToEmailAddressUsingGet = action({
  display: {
    label: "Find All References To Email Address",
    description: "Retrieve all references to an email address",
  },
  perform: async (context, { connection, emailAddress }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/v2/data-privacy/data-for-email-address`,
      { params: { emailAddress } },
    );
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    emailAddress: input({
      label: "Email Address",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "The email address",
    }),
  },
});

const findAllReferencesToPhoneNumberUsingGet = action({
  display: {
    label: "Find All References To Phone Number",
    description: "Retrieve all references to a phone number",
  },
  perform: async (context, { connection, phoneNumber }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/v2/data-privacy/data-for-phone-number`,
      { params: { phoneNumber } },
    );
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    phoneNumber: input({
      label: "Phone Number",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "The phone number",
    }),
  },
});

const purgeEmailAddressUsingPost = action({
  display: {
    label: "Purge Email Address",
    description:
      "Delete the email address, and all associated elements (/v2/data-privacy/erase-data-for-email-address)",
  },
  perform: async (context, { connection, emailAddress }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/v2/data-privacy/erase-data-for-email-address`,
      {},
      { params: { emailAddress } },
    );
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    emailAddress: input({
      label: "Email Address",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "The email address",
    }),
  },
});

const purgePhoneNumberUsingPost = action({
  display: {
    label: "Purge Phone Number",
    description:
      "Delete the phone number, and all associated elements (/v2/data-privacy/erase-data-for-phone-number)",
  },
  perform: async (context, { connection, phoneNumber }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/v2/data-privacy/erase-data-for-phone-number`,
      {},
      { params: { phoneNumber } },
    );
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    phoneNumber: input({
      label: "Phone Number",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "The phone number",
    }),
  },
});

const getCallsInSpecificFolderUsingGet = action({
  display: {
    label: "Get Calls In Specific Folder",
    description:
      "List of calls in a specific folder (/v2/library/folder-content)",
  },
  perform: async (context, { connection, folderId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/library/folder-content`, {
      params: { folderId },
    });
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    folderId: input({
      label: "Folder Id",
      type: "string",
      required: false,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments:
        "Gong's unique numeric identifier for the folder (up to 20 digits)",
    }),
  },
});

const getLibraryStructureUsingGet = action({
  display: {
    label: "Get Library Structure",
    description: "Retrieve Library folders (/v2/library/folders)",
  },
  perform: async (context, { connection, workspaceId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/library/folders`, {
      params: { workspaceId },
    });
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    workspaceId: input({
      label: "Workspace Id",
      type: "string",
      required: false,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Workspace identifier",
    }),
  },
});

const listLogsUsingGet = action({
  display: {
    label: "List Logs",
    description: "Retrieve logs data by type and time range (/v2/logs)",
  },
  perform: async (
    context,
    { connection, cursor, fromDateTime, logType, toDateTime },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/logs`, {
      params: { cursor, fromDateTime, logType, toDateTime },
    });
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    cursor: input({
      label: "Cursor",
      type: "string",
      required: false,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments:
        "When paging is needed, provide the value supplied by the previous API call to bring the following page of records",
    }),
    fromDateTime: input({
      label: "From Date Time",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments:
        "The time from which to retrieve log records, in the ISO-8601 format (e",
    }),
    logType: input({
      label: "Log Type",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Type of logs requested",
    }),
    toDateTime: input({
      label: "To Date Time",
      type: "string",
      required: false,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments:
        "The time until which to retrieve log records, in the ISO-8601 format (e",
    }),
  },
});

const addMeetingUsingPost = action({
  display: {
    label: "Add Meeting",
    description: "Create a New Gong Meeting (/v2/meetings)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v2/meetings`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const integrationStatusUsingPost = action({
  display: {
    label: "Integration Status",
    description:
      "Validate Gong meeting Integration (/v2/meetings/integration/status)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v2/meetings/integration/status`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const updateMeetingUsingPut = action({
  display: {
    label: "Update Meeting",
    description: "Update a Gong Meeting (/v2/meetings/{meetingId})",
  },
  perform: async (context, { connection, meetingId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/v2/meetings/${meetingId}`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    meetingId: input({
      label: "Meeting Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Gong's unique identifier for the meeting (up to 20 digits)",
    }),
  },
});

const deleteMeetingUsingDelete = action({
  display: {
    label: "Delete Meeting",
    description: "Delete a Gong Meeting (/v2/meetings)",
  },
  perform: async (context, { connection, meetingId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/v2/meetings/${meetingId}`);
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    meetingId: input({
      label: "Meeting Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Gong's unique identifier for the meeting (up to 20 digits)",
    }),
  },
});

const getPermissionProfileUsingGet = action({
  display: {
    label: "Get Permission Profile",
    description:
      "Permission profile for a given profile Id (/v2/permission-profile)",
  },
  perform: async (context, { connection, profileId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/permission-profile`, {
      params: { profileId },
    });
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    profileId: input({
      label: "Profile Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Permission profile identifier",
    }),
  },
});

const createPermissionProfileUsingPost = action({
  display: {
    label: "Create Permission Profile",
    description: "Create permission profile (/v2/permission-profile)",
  },
  perform: async (context, { connection, workspaceId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/v2/permission-profile`,
      {},
      { params: { workspaceId } },
    );
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    workspaceId: input({
      label: "Workspace Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Workspace identifier",
    }),
  },
});

const updatePermissionProfileUsingPut = action({
  display: {
    label: "Update Permission Profile",
    description: "Update permission profile (/v2/permission-profile)",
  },
  perform: async (context, { connection, profileId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/v2/permission-profile`,
      {},
      { params: { profileId } },
    );
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    profileId: input({
      label: "Profile Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Permission profile identifier",
    }),
  },
});

const listPermissionProfileUsersUsingGet = action({
  display: {
    label: "List Permission Profile Users",
    description:
      "List all users attached to a given permission profile (/v2/permission-profile/users)",
  },
  perform: async (context, { connection, profileId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/permission-profile/users`, {
      params: { profileId },
    });
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    profileId: input({
      label: "Profile Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments: "Permission profile identifier",
    }),
  },
});

const listScorecardsUsingGet = action({
  display: {
    label: "List Scorecards",
    description: "Retrieve scorecards details (/v2/settings/scorecards)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/settings/scorecards`);
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const listMultipleUsersAggregateActivityUsingPost = action({
  display: {
    label: "List Multiple Users Aggregate Activity",
    description:
      "Retrieve aggregated activity for defined users by date (/v2/stats/activity/aggregate)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v2/stats/activity/aggregate`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const listMultipleUsersAggregateByPeriodUsingPost = action({
  display: {
    label: "List Multiple Users Aggregate By Period",
    description:
      "Retrieve aggregated activity for defined users by a date range with grouping in time periods (/v2/stats/activity/aggregate-by-period)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `/v2/stats/activity/aggregate-by-period`,
      {},
    );
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const listMultipleUsersDayByDayActivityUsingPost = action({
  display: {
    label: "List Multiple Users Day By Day Activity",
    description:
      "Retrieve daily activity for applicable users for a date range (/v2/stats/activity/day-by-day)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v2/stats/activity/day-by-day`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const listAnsweredScorecardsUsingPost = action({
  display: {
    label: "List Answered Scorecards",
    description:
      "Retrieve answered scorecards for applicable reviewed users or scorecards for a date range (/v2/stats/activity/scorecards)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v2/stats/activity/scorecards`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const listInteractionStatsUsingPost = action({
  display: {
    label: "List Interaction Stats",
    description:
      "Retrieve interaction stats for applicable users by date (/v2/stats/interaction)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v2/stats/interaction`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const listUsersUsingGet1 = action({
  display: {
    label: "List Users",
    description: "List all users (/v2/users)",
  },
  perform: async (context, { connection, cursor, includeAvatars }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/users`, {
      params: { cursor, includeAvatars },
    });
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    cursor: input({
      label: "Cursor",
      type: "string",
      required: false,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments:
        "When paging is needed, provide the value supplied by the previous API call to bring the following page of records",
    }),
    includeAvatars: input({
      label: "Include Avatars",
      type: "string",
      required: false,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments:
        "Avatars are synthetic users representing Gong employees (CSMs and support providers) when they access your instance",
    }),
  },
});

const listMultipleUsersUsingPost = action({
  display: {
    label: "List Multiple Users",
    description: "List users by filter (/v2/users/extensive)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/v2/users/extensive`, {});
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

const getUserUsingGet = action({
  display: {
    label: "Get User",
    description: "Retrieve user (/v2/users/[id])",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/users/${id}`);
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    id: input({
      label: "Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments:
        "Gong's unique numeric identifier for the user (up to 20 digits)",
    }),
  },
});

const getUserHistoryUsingGet = action({
  display: {
    label: "Get User History",
    description: "Retrieve user history (/v2/users/[id]/settings-history)",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/users/${id}/settings-history`);
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
    id: input({
      label: "Id",
      type: "string",
      required: true,
      clean: (value): string | undefined =>
        util.types.toString(value) || undefined,
      comments:
        "Gong's unique numeric identifier for the user (up to 20 digits)",
    }),
  },
});

const listWorkspacesUsingGet = action({
  display: {
    label: "List Workspaces",
    description: "List all company workspaces (/v2/workspaces)",
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/workspaces`);
    return { data };
  },
  inputs: {
    connection: input({
      label: "Connection",
      type: "connection",
      required: true,
    }),
  },
});

export default {
  addCallUsingPost,
  addCallRecordingUsingPut,
  listCallsExtensiveUsingPost,
  listPermissionProfileUsingGet,
  listCrmCallsManualAssociationUsingGet,
  getCallTranscriptsUsingPost,
  getUsersAccessToCallsUsingGet,
  addUsersAccessToCallsUsingPut,
  deleteUsersAccessToCallsUsingDelete,
  deleteGenericCrmIntegrationUsingDelete,
  listGenericCrmIntegrationUsingGet,
  registerGenericCrmIntegrationUsingPut,
  mapCrmUsersUsingPost,
  uploadCrmDataUsingPost,
  getCrmObjectsUsingGet,
  uploadCrmSchemaFieldUsingPost,
  listCrmSchemaFieldsUsingGet,
  getRequestStatusUsingGet,
  uploadStagesUsingPost,
  customActionUsingPut,
  contentSharedUsingPut,
  contentViewedUsingPut,
  findAllReferencesToEmailAddressUsingGet,
  findAllReferencesToPhoneNumberUsingGet,
  purgeEmailAddressUsingPost,
  purgePhoneNumberUsingPost,
  getCallsInSpecificFolderUsingGet,
  getLibraryStructureUsingGet,
  listLogsUsingGet,
  addMeetingUsingPost,
  integrationStatusUsingPost,
  updateMeetingUsingPut,
  deleteMeetingUsingDelete,
  getPermissionProfileUsingGet,
  createPermissionProfileUsingPost,
  updatePermissionProfileUsingPut,
  listPermissionProfileUsersUsingGet,
  listScorecardsUsingGet,
  listMultipleUsersAggregateActivityUsingPost,
  listMultipleUsersAggregateByPeriodUsingPost,
  listMultipleUsersDayByDayActivityUsingPost,
  listAnsweredScorecardsUsingPost,
  listInteractionStatsUsingPost,
  listUsersUsingGet1,
  listMultipleUsersUsingPost,
  getUserUsingGet,
  getUserHistoryUsingGet,
  listWorkspacesUsingGet,
  processRule,
};
