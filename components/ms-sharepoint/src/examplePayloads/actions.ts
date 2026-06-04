












export const listChangesExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#Collection(driveItem)",
    "@odata.deltaLink":
      "https://graph.microsoft.com/v1.0/drives/b!ExampleDriveId/root/delta?token=MzslMjM0OyUyMzE7MDslMjM",
    value: [
      {
        id: "01EXAMPLENEWITEMID1234567890",
        name: "NewReport.xlsx",
        createdDateTime: "2025-12-09T14:30:00Z",
        lastModifiedDateTime: "2025-12-09T14:30:00Z",
        size: 45678,
        webUrl:
          "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/NewReport.xlsx",
        file: {
          mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          hashes: {
            quickXorHash: "ExampleHashValue123==",
          },
        },
        parentReference: {
          driveId: "b!ExampleDriveId123456789",
          id: "01EXAMPLEPARENTID",
          path: "/drives/b!ExampleDriveId123456789/root:",
        },
      },
      {
        id: "01EXAMPLEUPDATEDITEM987654321",
        name: "UpdatedPresentation.pptx",
        createdDateTime: "2025-12-01T10:00:00Z",
        lastModifiedDateTime: "2025-12-09T16:45:00Z",
        size: 234567,
        webUrl:
          "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/UpdatedPresentation.pptx",
        file: {
          mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          hashes: {
            quickXorHash: "UpdatedHashValue456==",
          },
        },
        parentReference: {
          driveId: "b!ExampleDriveId123456789",
          id: "01EXAMPLEPARENTID",
          path: "/drives/b!ExampleDriveId123456789/root:",
        },
      },
    ],
  },
};







export const rawRequestExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#sites",
    value: [
      {
        id: "example.sharepoint.com,a1b2c3d4-e5f6-7890-abcd-ef1234567890,f1e2d3c4-b5a6-7890-1234-567890abcdef",
        displayName: "Example Team Site",
        name: "ExampleTeamSite",
        createdDateTime: "2025-06-15T08:30:00Z",
        lastModifiedDateTime: "2025-12-09T14:22:00Z",
        webUrl: "https://example.sharepoint.com/sites/ExampleTeamSite",
        siteCollection: {
          hostname: "example.sharepoint.com",
        },
      },
    ],
  },
};






export const listSharedDocumentsExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#me/insights/shared",
    value: [
      {
        id: "AWExampleInsightId1234567890",
        lastShared: {
          sharedDateTime: "2025-12-09T10:15:00Z",
          sharingSubject: "Project Update Document",
          sharingType: "Direct",
          sharedBy: {
            displayName: "Jane Smith",
            address: "jane.smith@example.com",
            id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          },
        },
        resourceVisualization: {
          title: "Q4 Project Update.docx",
          type: "Word",
          mediaType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          previewImageUrl:
            "https://example.sharepoint.com/_api/v2.0/drives/b!ExampleDriveId/items/01EXAMPLEITEMID/thumbnails/0/c400x999/content",
          previewText: "This document contains the Q4 project status update...",
          containerWebUrl: "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents",
          containerDisplayName: "Example Team Site - Documents",
          containerType: "Site",
        },
        resourceReference: {
          id: "01EXAMPLESHAREDITEMID1234567",
          webUrl:
            "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/Q4%20Project%20Update.docx",
          type: "microsoft.graph.driveItem",
        },
      },
      {
        id: "AWExampleInsightId9876543210",
        lastShared: {
          sharedDateTime: "2025-12-08T14:30:00Z",
          sharingSubject: "Budget Spreadsheet",
          sharingType: "Link",
          sharedBy: {
            displayName: "John Doe",
            address: "john.doe@example.com",
            id: "b2c3d4e5-f6g7-8901-bcde-f23456789012",
          },
        },
        resourceVisualization: {
          title: "2025 Budget.xlsx",
          type: "Excel",
          mediaType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          previewImageUrl:
            "https://example.sharepoint.com/_api/v2.0/drives/b!ExampleDriveId/items/01EXAMPLEITEMID2/thumbnails/0/c400x999/content",
          previewText: "Annual budget spreadsheet for 2025...",
          containerWebUrl: "https://example.sharepoint.com/sites/Finance",
          containerDisplayName: "Finance Team Site",
          containerType: "Site",
        },
        resourceReference: {
          id: "01EXAMPLESHAREDITEMID9876543",
          webUrl: "https://example.sharepoint.com/sites/Finance/Documents/2025%20Budget.xlsx",
          type: "microsoft.graph.driveItem",
        },
      },
    ],
  },
};






export const listSiteListsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#sites('example.sharepoint.com%2Ca1b2c3d4-e5f6-7890-abcd-ef1234567890%2Cf1e2d3c4-b5a6-7890-1234-567890abcdef')/lists",
    value: [
      {
        "@odata.etag": '"a1b2c3d4-e5f6-7890-abcd-ef1234567890,1"',
        id: "f1e2d3c4-b5a6-7890-1234-567890abcdef",
        displayName: "Tasks",
        name: "Tasks",
        createdDateTime: "2025-06-15T08:30:00Z",
        lastModifiedDateTime: "2025-12-09T10:15:00Z",
        webUrl: "https://example.sharepoint.com/sites/ExampleSite/Lists/Tasks",
        list: {
          contentTypesEnabled: true,
          hidden: false,
          template: "genericList",
        },
      },
      {
        "@odata.etag": '"b2c3d4e5-f6g7-8901-bcde-f23456789012,2"',
        id: "g2f3e4d5-c6b7-8901-2345-678901bcdefg",
        displayName: "Announcements",
        name: "Announcements",
        createdDateTime: "2025-07-20T12:00:00Z",
        lastModifiedDateTime: "2025-12-08T16:30:00Z",
        webUrl: "https://example.sharepoint.com/sites/ExampleSite/Lists/Announcements",
        list: {
          contentTypesEnabled: true,
          hidden: false,
          template: "announcements",
        },
      },
    ],
  },
};






export const getSiteListExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#sites('example.sharepoint.com%2Ca1b2c3d4-e5f6-7890-abcd-ef1234567890%2Cf1e2d3c4-b5a6-7890-1234-567890abcdef')/lists/$entity",
    "@odata.etag": '"a1b2c3d4-e5f6-7890-abcd-ef1234567890,3"',
    id: "f1e2d3c4-b5a6-7890-1234-567890abcdef",
    displayName: "Project Tasks",
    name: "ProjectTasks",
    createdDateTime: "2025-06-15T08:30:00Z",
    lastModifiedDateTime: "2025-12-09T10:15:00Z",
    webUrl: "https://example.sharepoint.com/sites/ExampleSite/Lists/ProjectTasks",
    list: {
      contentTypesEnabled: true,
      hidden: false,
      template: "genericList",
    },
    columns: [
      {
        name: "Title",
        displayName: "Title",
        required: true,
        text: {
          allowMultipleLines: false,
          appendChangesToExistingText: false,
          linesForEditing: 0,
          maxLength: 255,
        },
      },
      {
        name: "Status",
        displayName: "Status",
        required: false,
        choice: {
          allowTextEntry: false,
          choices: ["Not Started", "In Progress", "Completed"],
          displayAs: "dropDownMenu",
        },
      },
    ],
  },
};






export const listItemsInSiteListExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#sites('example.sharepoint.com%2Ca1b2c3d4-e5f6-7890-abcd-ef1234567890%2Cf1e2d3c4-b5a6-7890-1234-567890abcdef')/lists('f1e2d3c4-b5a6-7890-1234-567890abcdef')/items",
    value: [
      {
        "@odata.etag": '"a1b2c3d4-e5f6-7890-abcd-ef1234567890,1"',
        id: "1",
        createdDateTime: "2025-12-01T09:00:00Z",
        lastModifiedDateTime: "2025-12-09T11:30:00Z",
        webUrl: "https://example.sharepoint.com/sites/ExampleSite/Lists/ProjectTasks/1_.000",
        fields: {
          "@odata.etag": '"a1b2c3d4-e5f6-7890-abcd-ef1234567890,1"',
          id: "1",
          Title: "Design new homepage",
          Status: "In Progress",
          AssignedTo: "john.doe@example.com",
          DueDate: "2025-12-15T00:00:00Z",
        },
      },
      {
        "@odata.etag": '"b2c3d4e5-f6g7-8901-bcde-f23456789012,2"',
        id: "2",
        createdDateTime: "2025-12-05T14:20:00Z",
        lastModifiedDateTime: "2025-12-09T16:45:00Z",
        webUrl: "https://example.sharepoint.com/sites/ExampleSite/Lists/ProjectTasks/2_.000",
        fields: {
          "@odata.etag": '"b2c3d4e5-f6g7-8901-bcde-f23456789012,2"',
          id: "2",
          Title: "Update documentation",
          Status: "Not Started",
          AssignedTo: "jane.smith@example.com",
          DueDate: "2025-12-20T00:00:00Z",
        },
      },
    ],
  },
};






export const getItemFromSiteListExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#sites('example.sharepoint.com%2Ca1b2c3d4-e5f6-7890-abcd-ef1234567890%2Cf1e2d3c4-b5a6-7890-1234-567890abcdef')/lists('f1e2d3c4-b5a6-7890-1234-567890abcdef')/items/$entity",
    "@odata.etag": '"a1b2c3d4-e5f6-7890-abcd-ef1234567890,3"',
    id: "5",
    createdDateTime: "2025-12-08T10:30:00Z",
    lastModifiedDateTime: "2025-12-09T14:15:00Z",
    webUrl: "https://example.sharepoint.com/sites/ExampleSite/Lists/ProjectTasks/5_.000",
    fields: {
      "@odata.etag": '"a1b2c3d4-e5f6-7890-abcd-ef1234567890,3"',
      id: "5",
      Title: "Review Q4 metrics",
      Status: "Completed",
      AssignedTo: "john.doe@example.com",
      DueDate: "2025-12-09T00:00:00Z",
      CompletedDate: "2025-12-09T14:15:00Z",
    },
  },
};






export const createItemInSiteListExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#sites('example.sharepoint.com%2Ca1b2c3d4-e5f6-7890-abcd-ef1234567890%2Cf1e2d3c4-b5a6-7890-1234-567890abcdef')/lists('f1e2d3c4-b5a6-7890-1234-567890abcdef')/items/$entity",
    "@odata.etag": '"a1b2c3d4-e5f6-7890-abcd-ef1234567890,1"',
    id: "15",
    createdDateTime: "2025-12-09T16:30:00Z",
    lastModifiedDateTime: "2025-12-09T16:30:00Z",
    webUrl: "https://example.sharepoint.com/sites/ExampleSite/Lists/ProjectTasks/15_.000",
    fields: {
      "@odata.etag": '"a1b2c3d4-e5f6-7890-abcd-ef1234567890,1"',
      id: "15",
      Title: "Prepare presentation",
      Status: "Not Started",
      AssignedTo: "jane.smith@example.com",
      DueDate: "2025-12-18T00:00:00Z",
    },
  },
};
