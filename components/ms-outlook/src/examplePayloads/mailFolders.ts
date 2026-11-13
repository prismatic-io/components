import type { MailSearchFolder } from "@microsoft/microsoft-graph-types";
import type { ODataAttrs, PaginatedResponse } from "../types";

export const listMailFoldersExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#users('68ca8ec0-11f8-456b-a785-70d9936650d5')/mailFolders",
    value: [
      {
        id: "AQMkADYAAAIBCgAAAA==",
        displayName: "Deleted Items",
        parentFolderId: "AQMkADYAAAIBCAAAAA==",
        childFolderCount: 0,
        unreadItemCount: 0,
        totalItemCount: 0,
        isHidden: false,
      },
      {
        id: "AQMkADYAAAIBDwAAAA==",
        displayName: "Drafts",
        parentFolderId: "AQMkADYAAAIBCAAAAA==",
        childFolderCount: 0,
        unreadItemCount: 0,
        totalItemCount: 0,
        isHidden: false,
      },
      {
        id: "AQMkADYAAAIBDAAAAA==",
        displayName: "Inbox",
        parentFolderId: "AQMkADYAAAIBCAAAAA==",
        childFolderCount: 1,
        unreadItemCount: 70,
        totalItemCount: 71,
        isHidden: false,
      },
      {
        "@odata.type": "#microsoft.graph.mailSearchFolder",
        id: "AAMkADYRAAAZg1yTAAA=",
        displayName: "Weekly digests",
        parentFolderId: "AQMkADYAAAIBDAAAAA==",
        childFolderCount: 0,
        unreadItemCount: 4,
        totalItemCount: 5,
        isHidden: false,
        isSupported: true,
        filterQuery: "contains(subject, 'weekly digest')",
      },
      {
        id: "AQMkADYAAAIBGQAAAA==",
        displayName: "Junk Email",
        parentFolderId: "AQMkADYAAAIBCAAAAA==",
        childFolderCount: 0,
        unreadItemCount: 0,
        totalItemCount: 0,
        isHidden: false,
      },
      {
        id: "AQMkADYAAAIBCwAAAA==",
        displayName: "Outbox",
        parentFolderId: "AQMkADYAAAIBCAAAAA==",
        childFolderCount: 0,
        unreadItemCount: 0,
        totalItemCount: 0,
        isHidden: false,
      },
      {
        id: "AQMkADYAAAIBCQAAAA==",
        displayName: "Sent Items",
        parentFolderId: "AQMkADYAAAIBCAAAAA==",
        childFolderCount: 0,
        unreadItemCount: 0,
        totalItemCount: 0,
        isHidden: false,
      },
    ],
  } as PaginatedResponse<MailSearchFolder & ODataAttrs>,
};

export const createMailFolderExamplePayload = {
  data: {
    id: "AQMkADYAAAIBDAAAAA==",
    displayName: "Project Files",
    parentFolderId: "AQMkADYAAAIBCAAAAA==",
    childFolderCount: 0,
    unreadItemCount: 0,
    totalItemCount: 0,
    isHidden: false,
  } as MailSearchFolder,
};

export const deleteMailFolderExamplePayload = {
  data: { success: true, id: "AQMkADYAAAIBDwAAAA==", message: "Mail folder deleted successfully" },
};

export const selectMailFolderExamplePayload = {
  result: [
    { label: "Deleted Items", key: "AQMkADYAAAIBCgAAAA==" },
    { label: "Drafts", key: "AQMkADYAAAIBDwAAAA==" },
  ],
};
