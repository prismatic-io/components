export const listFoldersExamplePayload = {
  data: {
    resultSetSize: "2",
    startPosition: "0",
    endPosition: "1",
    totalSetSize: "4",
    folders: [
      {
        name: "Inbox",
        type: "inbox",
        owner: {
          userName: "Jane Doe",
          userId: "4c1d7e2a-9b3f-4a6e-8d5c-2f7b1a9e3c60",
          email: "jane.doe@example.com",
        },
        folderId: "c5a1f3e7-9d2b-4c8a-b6e0-4f7d1a3c9e85",
        uri: "/folders/c5a1f3e7-9d2b-4c8a-b6e0-4f7d1a3c9e85",
        itemCount: "0",
        subFolderCount: "0",
        hasSubFolders: "false",
      },
      {
        name: "Sent Items",
        type: "sentitems",
        owner: {
          userName: "Jane Doe",
          userId: "4c1d7e2a-9b3f-4a6e-8d5c-2f7b1a9e3c60",
          email: "jane.doe@example.com",
        },
        folderId: "f1d8b4a6-2c7e-4a3f-9b5d-6e0c2f8a4d71",
        uri: "/folders/f1d8b4a6-2c7e-4a3f-9b5d-6e0c2f8a4d71",
        itemCount: "0",
        subFolderCount: "0",
        hasSubFolders: "false",
      },
    ],
  },
};

export const listFolderItemsExamplePayload = {
  data: {
    resultSetSize: "1",
    startPosition: "0",
    endPosition: "0",
    totalSetSize: "1",
    folders: [
      {
        name: "Sent Items",
        type: "sentitems",
        owner: {
          userName: "Jane Doe",
          userId: "4c1d7e2a-9b3f-4a6e-8d5c-2f7b1a9e3c60",
          email: "jane.doe@example.com",
        },
        folderId: "f1d8b4a6-2c7e-4a3f-9b5d-6e0c2f8a4d71",
        uri: "/folders/f1d8b4a6-2c7e-4a3f-9b5d-6e0c2f8a4d71",
        itemCount: "0",
        subFolderCount: "0",
        hasSubFolders: "false",
      },
    ],
  },
};

export const foldersExamplePayload = {
  result: [
    {
      key: "c5a1f3e7-9d2b-4c8a-b6e0-4f7d1a3c9e85",
      label: "Inbox",
    },
    {
      key: "f1d8b4a6-2c7e-4a3f-9b5d-6e0c2f8a4d71",
      label: "Sent Items",
    },
  ],
};
