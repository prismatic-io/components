export const listDirectoryAuditsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#auditlogs/directoryaudits",
    value: [
      {
        id: "2f8c1a6e-4b3d-4e9a-8c7f-1d2e3f4a5b6c",
        category: "UserManagement",
        correlationId: "da159bfb-54fa-4092-8a38-6e1fa7870e30",
        result: "success",
        resultReason: "Successfully added member to group",
        activityDisplayName: "Add member to group",
        activityDateTime: "2018-01-09T21:20:02.7215374Z",
        loggedByService: "Core Directory",
        initiatedBy: {
          user: {
            id: "728309ae-1a37-4937-9afe-e35d964db09b",
            displayName: "Audry Oliver",
            userPrincipalName: "bob@wingtiptoysonline.com",
            ipAddress: "127.0.0.1",
          },
          app: null,
        },
        targetResources: [
          {
            id: "ef7e527d-6c92-4234-8c6d-cf6fdfb57f95",
            displayName: "Example.com",
            type: "Group",
            modifiedProperties: [
              {
                displayName: "Action Client Name",
                oldValue: null,
                newValue: "DirectorySync",
              },
            ],
            groupType: "unifiedGroups",
          },
          {
            id: "1f0e98f5-3161-4c6b-9b50-d488572f2bb7",
            displayName: null,
            type: "User",
            modifiedProperties: [],
            userPrincipalName: "bob@contoso.com",
          },
        ],
        additionalDetails: [
          {
            key: "Additional Detail Name",
            value: "Additional Detail Value",
          },
        ],
      },
    ],
  },
};

export const getDirectoyAuditExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#auditLogs/directoryAudits/$entity",
    id: "2f8c1a6e-4b3d-4e9a-8c7f-1d2e3f4a5b6c",
    category: "UserManagement",
    correlationId: "da159bfb-54fa-4092-8a38-6e1fa7870e30",
    result: "success",
    resultReason: "Successfully added member to group",
    activityDisplayName: "Add member to group",
    activityDateTime: "2018-01-09T21:20:02.7215374Z",
    loggedByService: "Core Directory",
    initiatedBy: {
      user: {
        id: "728309ae-1a37-4937-9afe-e35d964db09b",
        displayName: "Audry Oliver",
        userPrincipalName: "bob@wingtiptoysonline.com",
        ipAddress: "127.0.0.1",
      },
      app: null,
    },
    targetResources: [
      {
        id: "ef7e527d-6c92-4234-8c6d-cf6fdfb57f95",
        displayName: "Example.com",
        type: "Group",
        modifiedProperties: [
          {
            displayName: "Action Client Name",
            oldValue: null,
            newValue: "DirectorySync",
          },
        ],
        groupType: "unifiedGroups",
      },
      {
        id: "1f0e98f5-3161-4c6b-9b50-d488572f2bb7",
        displayName: null,
        type: "User",
        modifiedProperties: [],
        userPrincipalName: "example@contoso.com",
      },
    ],
    additionalDetails: [
      {
        key: "Additional Detail Name",
        value: "Additional Detail Value",
      },
    ],
  },
};

export const selectDirectoryAuditExamplePayload = {
  result: [
    {
      label: "Add member to group",
      key: "2f8c1a6e-4b3d-4e9a-8c7f-1d2e3f4a5b6c",
    },
  ],
};
