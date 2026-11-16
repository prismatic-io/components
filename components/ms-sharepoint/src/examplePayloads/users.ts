export const listSharedDocumentsExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#me/insights/shared",
    value: [
      {
        id: "AWbIRKdbIvE6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxDXH3P5XEJFT6Z7LZFYVEPIUB2XBIZRHS4",
        lastShared: {
          sharedDateTime: "2026-11-06T10:15:00Z",
          sharingSubject: "Quarterly Report draft",
          sharingType: "Direct",
          sharedBy: {
            displayName: "Jane Smith",
            address: "jane.smith@example.com",
            id: "e882d549-a306-4d1a-b440-a0e2818f1bcc",
          },
        },
        resourceVisualization: {
          title: "Quarterly Report.docx",
          type: "Word",
          mediaType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          previewImageUrl:
            "https://example.sharepoint.com/_api/v2.0/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/items/01XH3P5XEJFT6Z7LZFYVEPIUB2XBIZRHS4/thumbnails/0/c400x999/content",
          previewText: "This document contains the Q4 project status update...",
          containerWebUrl: "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents",
          containerDisplayName: "Example Team Site - Documents",
          containerType: "Site",
        },
        resourceReference: {
          id: "01XH3P5XEJFT6Z7LZFYVEPIUB2XBIZRHS4",
          webUrl:
            "https://example.sharepoint.com/sites/ExampleSite/Shared%20Documents/Project%20Files/Quarterly%20Report.docx",
          type: "microsoft.graph.driveItem",
        },
      },
      {
        id: "AWbIRKdbIvE6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxDJBWI5722H5Q6YFW4JM7JLFA2U2TZQ7U4",
        lastShared: {
          sharedDateTime: "2026-11-04T14:30:00Z",
          sharingSubject: "Budget Spreadsheet",
          sharingType: "Link",
          sharedBy: {
            displayName: "Michael Brown",
            address: "michael.brown@example.com",
            id: "5a2b9c3d-8e1f-4a6b-9c7d-0e2f4a6b8c1d",
          },
        },
        resourceVisualization: {
          title: "2026 Budget.xlsx",
          type: "Excel",
          mediaType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          previewImageUrl:
            "https://example.sharepoint.com/_api/v2.0/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/items/01JBWI5722H5Q6YFW4JM7JLFA2U2TZQ7U4/thumbnails/0/c400x999/content",
          previewText: "Annual budget spreadsheet for 2026...",
          containerWebUrl: "https://example.sharepoint.com/sites/Finance",
          containerDisplayName: "Finance Team Site",
          containerType: "Site",
        },
        resourceReference: {
          id: "01JBWI5722H5Q6YFW4JM7JLFA2U2TZQ7U4",
          webUrl: "https://example.sharepoint.com/sites/Finance/Documents/2026%20Budget.xlsx",
          type: "microsoft.graph.driveItem",
        },
      },
    ],
  },
};

export const getCurrentUserExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users/$entity",
    businessPhones: ["+1 555 555 5555"],
    displayName: "John Doe",
    givenName: "John",
    jobTitle: "Retail Manager",
    mail: "john.doe@example.com",
    mobilePhone: "+1 555 555 5555",
    officeLocation: "18/2111",
    preferredLanguage: "en-US",
    surname: "Doe",
    userPrincipalName: "john.doe@example.com",
    id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
  },
};
