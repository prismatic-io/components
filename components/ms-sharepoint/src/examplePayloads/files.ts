export const moveFileExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#drives('b%21j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD')/items/$entity",
    "@microsoft.graph.downloadUrl":
      "https://example.sharepoint.com/sites/ExampleSite/_layouts/15/download.aspx?UniqueId=efd16534-2913-417c-b4d3-5afb73d01082&Translate=false&tempauth=v1.eyJzaXRlaWQiOiI2YzQ0ODg4Zi01ODgzLTRlZjAtYTU0Mi1kMjFhODAyY2ZlYTYifQ.Hb4tW9yNc2xQe7rLm1vKs5pDg8jFa0uZ3iO6dTqXwYz&ApiVersion=2.0",
    createdDateTime: "2026-10-21T09:12:40Z",
    eTag: '"{EFD16534-2913-417C-B4D3-5AFB73D01082},7"',
    id: "01XH3P5XEJFT6Z7LZFYVEPIUB2XBIZRHS4",
    lastModifiedDateTime: "2026-11-02T16:48:05Z",
    name: "Quarterly Report.docx",
    webUrl:
      "https://example.sharepoint.com/sites/ExampleSite/_layouts/15/Doc.aspx?sourcedoc=%7BEFD16534-2913-417C-B4D3-5AFB73D01082%7D&file=Quarterly%20Report.docx&action=default&mobileredirect=true",
    cTag: '"c:{EFD16534-2913-417C-B4D3-5AFB73D01082},8"',
    size: 19802,
    createdBy: {
      user: {
        email: "john.doe@example.com",
        id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
        displayName: "John Doe",
      },
    },
    lastModifiedBy: {
      user: {
        email: "jane.smith@example.com",
        id: "e882d549-a306-4d1a-b440-a0e2818f1bcc",
        displayName: "Jane Smith",
      },
    },
    parentReference: {
      driveType: "documentLibrary",
      driveId: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
      id: "01GSSFDXCQ3Z5WH3SSD24SI4FP2CHOPJFT",
      name: "Project Files",
      path: "/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root:/Project%20Files",
      siteId: "6c44888f-5883-4ef0-a542-d21a802cfea6",
    },
    file: {
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      hashes: {
        quickXorHash: "qTIajjjlF4renYX/hcfv6e/UmS8=",
      },
    },
    fileSystemInfo: {
      createdDateTime: "2026-10-21T09:12:40Z",
      lastModifiedDateTime: "2026-11-02T16:48:05Z",
    },
    shared: {
      scope: "users",
    },
  },
};

const budgetWorkbook = {
  "@microsoft.graph.downloadUrl":
    "https://example.sharepoint.com/sites/ExampleSite/_layouts/15/download.aspx?UniqueId=31b7d908-fb81-40d2-9baf-7055a5e95bce&Translate=false&tempauth=v1.eyJzaXRlaWQiOiI2YzQ0ODg4Zi01ODgzLTRlZjAtYTU0Mi1kMjFhODAyY2ZlYTYifQ.Rz8nQ2wLx5vT0pYk7mHc3aJd9gFs1eUb6iO4tNqWyXp&ApiVersion=2.0",
  createdDateTime: "2026-11-03T09:30:14Z",
  eTag: '"{31B7D908-FB81-40D2-9BAF-7055A5E95BCE},1"',
  id: "01TYIFWGD5VQB4TCX2YNU6QBNFNQ5J7AMB",
  lastModifiedDateTime: "2026-11-03T09:30:14Z",
  name: "Budget 2026.xlsx",
  webUrl:
    "https://example.sharepoint.com/sites/ExampleSite/_layouts/15/Doc.aspx?sourcedoc=%7B31B7D908-FB81-40D2-9BAF-7055A5E95BCE%7D&file=Budget%202026.xlsx&action=default&mobileredirect=true",
  cTag: '"c:{31B7D908-FB81-40D2-9BAF-7055A5E95BCE},1"',
  size: 41216,
  createdBy: {
    user: {
      email: "john.doe@example.com",
      id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
      displayName: "John Doe",
    },
  },
  lastModifiedBy: {
    user: {
      email: "john.doe@example.com",
      id: "efee1b77-fb3b-4f65-99d6-274c11914d12",
      displayName: "John Doe",
    },
  },
  parentReference: {
    driveType: "documentLibrary",
    driveId: "b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD",
    id: "01GSSFDXCQ3Z5WH3SSD24SI4FP2CHOPJFT",
    name: "Project Files",
    path: "/drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root:/Project%20Files",
    siteId: "6c44888f-5883-4ef0-a542-d21a802cfea6",
  },
  file: {
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    hashes: {
      quickXorHash: "RHRzahXgMuuSKWIOLgORcT7/jls=",
    },
  },
  fileSystemInfo: {
    createdDateTime: "2026-11-03T09:30:14Z",
    lastModifiedDateTime: "2026-11-03T09:30:14Z",
  },
};

export const uploadFileExamplePayload = {
  data: budgetWorkbook,
};

export const updateFileExamplePayload = {
  data: {
    ...budgetWorkbook,
    eTag: '"{31B7D908-FB81-40D2-9BAF-7055A5E95BCE},2"',
    cTag: '"c:{31B7D908-FB81-40D2-9BAF-7055A5E95BCE},2"',
    lastModifiedDateTime: "2026-11-05T15:12:48Z",
    size: 44480,
    file: {
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      hashes: {
        quickXorHash: "kvaowiXJyVc/sd61ERgAyj3gl9s=",
      },
    },
    fileSystemInfo: {
      createdDateTime: "2026-11-03T09:30:14Z",
      lastModifiedDateTime: "2026-11-05T15:12:48Z",
    },
  },
};

export const downloadFileExamplePayload = {
  data: Buffer.from("Agenda\n1. Q4 results\n2. 2026 budget review\n3. Next steps\n"),
  contentType: "text/plain",
};

export const getFileExamplePayload = {
  data: "Agenda\n1. Q4 results\n2. 2026 budget review\n3. Next steps\n",
};
