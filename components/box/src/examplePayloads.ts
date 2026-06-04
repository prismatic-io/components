







export const pathDetailsExamplePayload = {
  data: [{ id: "12345", type: "file", name: "Quarterly Report.pdf" }],
};





export const moveObjectExamplePayload = {
  data: [{ id: "67890", type: "folder", name: "Archive" }],
};





export const downloadFileExamplePayload = {
  data: Buffer.from("example"),
  contentType: "application/octet",
};





export const uploadFileExamplePayload = {
  data: [{ id: "54321", type: "folder", name: "Uploads" }],
};





export const copyObjectExamplePayload = {
  data: [{ id: "98765", type: "folder", name: "Documents Backup" }],
};





export const listWebhooksExamplePayload = {
  data: {
    next_marker: "ZmlQZS0xLTE%3D",
    entries: [
      {
        id: "1234",
        type: "webhook",
        target: { id: "22222", type: "folder" },
      },
      { id: "5678", type: "webhook", target: { id: "11111", type: "file" } },
    ],
    limit: 2,
  },
};





export const createWebhookExamplePayload = {
  data: {
    id: "1234",
    type: "webhook",
    target: { id: "22222", type: "folder" },
    created_by: {
      type: "user",
      id: "33333",
      name: "Example User",
      login: "user@example.com",
    },
    created_at: "2016-05-09T17:41:27-07:00",
    address: "https://example.com/webhook",
    triggers: ["FILE.DOWNLOADED", "FILE.UPLOADED"],
  },
  crossFlowState: { primarySignatureKey: "3T2eTfOvJbAIRoBpXsXPmq0gn8CmF5Q7" },
};





export const deleteWebhookExamplePayload = { data: null };





export const findFileForSharedLinkExamplePayload = {
  data: {
    type: "file",
    id: "53286756412",
    name: "Contract_2024.pdf",
  },
};





export const getSharedLinkForFileExamplePayload = {
  data: {
    sharedLink: "https://app.box.com/s/abbvr71aw8a4gb7u2541hlv45l806u5h",
  },
};





export const findFolderForSharedLinkExamplePayload = {
  data: {
    type: "folder",
    id: "84759261038",
    name: "Shared Documents",
  },
};





export const getSharedLinkForFolderExamplePayload = {
  data: {
    sharedLink: "https://app.box.com/s/abbvr71aw8a4gb7u2541hlv45l806u5h",
  },
};





export const listFolderExamplePayload = {
  data: [{ id: "29384756102", type: "folder", name: "Project Files" }],
};





export const listFolderWithPaginationExamplePayload = {
  data: {
    entries: [{ id: "29384756102", type: "folder", name: "Project Files" }],
    pagination: {
      next_marker: "JV9IRGZmieiBasejOG9yDCRNgd2ymoZIbjsxbJMjIs3kioVii",
      limit: 1000,
    },
  },
};





export const createFolderExamplePayload = {
  data: {
    id: "47892301654",
    status: "active",
    name: "New Project Folder",
    created_at: "2024-03-15T09:30:00-07:00",
    description: "",
    folder: "All Files",
  },
};





export const getCurrentUserExamplePayload = {
  data: {
    type: "user",
    id: "33333",
    name: "Example User",
    login: "user@example.com",
    created_at: "2012-03-26T15:43:07-07:00",
    modified_at: "2012-12-12T11:34:29-08:00",
    language: "en",
    space_amount: 5368709120,
    space_used: 2377016,
    max_upload_size: 262144000,
    status: "active",
    job_title: "Employee",
    phone: "5555555555",
    address: "555 Office Drive",
    avatar_url: "https://app.box.com/api/avatar/deprecated",
  },
};





export const getFileDownloadUrlExamplePayload = {
  data: "https://dl.boxcloud.com/d/1/b1!abc123-example-download-url/download",
};
