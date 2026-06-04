












export const webhookNotificationExamplePayload = {
  body: {
    data: {
      value: [
        {
          subscriptionId: "38031b7d-16b1-448a-8e68-68b8aec62315",
          clientState: "client-specific-string",
          changeType: "updated",
          resource: "drives/b!exampleDriveId/items/01EXAMPLEITEMID",
          resourceData: {
            "@odata.type": "#Microsoft.Graph.DriveItem",
            "@odata.id": "drives/b!exampleDriveId/items/01EXAMPLEITEMID",
            id: "01EXAMPLEITEMID",
          },
          subscriptionExpirationDateTime: "2025-12-15T11:23:00.0000000Z",
          tenantId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        },
        {
          subscriptionId: "38031b7d-16b1-448a-8e68-68b8aec62315",
          clientState: "client-specific-string",
          changeType: "created",
          resource: "drives/b!exampleDriveId/items/02EXAMPLEITEMID",
          resourceData: {
            "@odata.type": "#Microsoft.Graph.DriveItem",
            "@odata.id": "drives/b!exampleDriveId/items/02EXAMPLEITEMID",
            id: "02EXAMPLEITEMID",
          },
          subscriptionExpirationDateTime: "2025-12-15T11:23:00.0000000Z",
          tenantId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        },
      ],
    },
  },
};








export const webhookValidationExamplePayload = {
  queryParameters: {
    validationToken: "Validation: Testing connector endpoint validation.",
  },
};







export const pollSiteChangesExamplePayload = {
  body: {
    data: {
      Documents: {
        added: [
          {
            id: "01EXAMPLENEWITEMID1234567890",
            name: "NewDocument.docx",
            createdDateTime: "2025-12-09T14:30:00Z",
            lastModifiedDateTime: "2025-12-09T14:30:00Z",
            size: 15234,
            webUrl:
              "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/NewDocument.docx",
            file: {
              mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            },
            parentReference: {
              driveId: "b!ExampleDriveId123456789",
              id: "01EXAMPLEPARENTID",
            },
          },
        ],
        updated: [
          {
            id: "01EXAMPLEUPDATEDITEM987654321",
            name: "UpdatedSpreadsheet.xlsx",
            createdDateTime: "2025-12-08T10:15:00Z",
            lastModifiedDateTime: "2025-12-09T16:45:00Z",
            size: 28943,
            webUrl:
              "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/UpdatedSpreadsheet.xlsx",
            file: {
              mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            },
            parentReference: {
              driveId: "b!ExampleDriveId123456789",
              id: "01EXAMPLEPARENTID",
            },
          },
        ],
        deleted: [
          {
            id: "01EXAMPLEDELETEDITEM555555555",
            name: "OldReport.pdf",
            deleted: {
              state: "deleted",
            },
            parentReference: {
              driveId: "b!ExampleDriveId123456789",
              id: "01EXAMPLEPARENTID",
            },
          },
        ],
      },
      Marketing: {
        added: [
          {
            id: "01EXAMPLEMARKETINGITEM999999",
            name: "CampaignBrief.pptx",
            createdDateTime: "2025-12-09T09:20:00Z",
            lastModifiedDateTime: "2025-12-09T09:20:00Z",
            size: 3456789,
            webUrl: "https://example.sharepoint.com/sites/ExampleSite/Marketing/CampaignBrief.pptx",
            file: {
              mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            },
            parentReference: {
              driveId: "b!ExampleMarketingDriveId987654",
              id: "01EXAMPLEMARKETINGPARENTID",
            },
          },
        ],
      },
    },
  },
};







export const drivePollingTriggerExamplePayload = {
  body: {
    data: {
      added: [
        {
          id: "01EXAMPLENEWFILE1234567890ABCD",
          name: "ProjectPlan.docx",
          createdDateTime: "2025-12-09T11:00:00Z",
          lastModifiedDateTime: "2025-12-09T11:00:00Z",
          size: 45678,
          webUrl: "https://example.sharepoint.com/sites/ExampleSite/Documents/ProjectPlan.docx",
          file: {
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          },
          parentReference: {
            driveId: "b!ExampleDriveId123456789",
            id: "01EXAMPLEFOLDERID",
          },
        },
      ],
      updated: [
        {
          id: "01EXAMPLEUPDATEDFILE555555555",
          name: "Budget2025.xlsx",
          createdDateTime: "2025-12-01T08:30:00Z",
          lastModifiedDateTime: "2025-12-09T15:22:00Z",
          size: 128456,
          webUrl: "https://example.sharepoint.com/sites/ExampleSite/Documents/Budget2025.xlsx",
          file: {
            mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
          parentReference: {
            driveId: "b!ExampleDriveId123456789",
            id: "01EXAMPLEFOLDERID",
          },
        },
      ],
      deleted: [
        {
          id: "01EXAMPLEDELETEDFILE888888888",
          name: "TempNotes.txt",
          deleted: {
            state: "deleted",
          },
          parentReference: {
            driveId: "b!ExampleDriveId123456789",
            id: "01EXAMPLEFOLDERID",
          },
        },
      ],
      moved: [
        {
          id: "01EXAMPLEMOVEDFILE777777777",
          name: "ArchiveDocument.pdf",
          createdDateTime: "2025-11-15T10:00:00Z",
          lastModifiedDateTime: "2025-12-09T13:45:00Z",
          size: 234567,
          webUrl: "https://example.sharepoint.com/sites/ExampleSite/Archive/ArchiveDocument.pdf",
          file: {
            mimeType: "application/pdf",
          },
          parentReference: {
            driveId: "b!ExampleDriveId123456789",
            id: "01EXAMPLEARCHIVEFOLDERID",
          },
        },
      ],
    },
  },
};







export const folderPollingTriggerExamplePayload = {
  body: {
    data: {
      added: [
        {
          id: "01EXAMPLENEWFOLDERITEM123456",
          name: "Proposal.docx",
          createdDateTime: "2025-12-09T10:15:00Z",
          lastModifiedDateTime: "2025-12-09T10:15:00Z",
          size: 67890,
          webUrl:
            "https://example.sharepoint.com/sites/ExampleSite/Documents/Projects/Proposal.docx",
          file: {
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          },
          parentReference: {
            driveId: "b!ExampleDriveId123456789",
            id: "01EXAMPLEPROJECTSFOLDERID",
          },
        },
      ],
      updated: [
        {
          id: "01EXAMPLEUPDATEDFOLDERITEM999",
          name: "Roadmap.xlsx",
          createdDateTime: "2025-11-20T14:00:00Z",
          lastModifiedDateTime: "2025-12-09T16:30:00Z",
          size: 98765,
          webUrl:
            "https://example.sharepoint.com/sites/ExampleSite/Documents/Projects/Roadmap.xlsx",
          file: {
            mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
          parentReference: {
            driveId: "b!ExampleDriveId123456789",
            id: "01EXAMPLEPROJECTSFOLDERID",
          },
        },
      ],
    },
  },
};
