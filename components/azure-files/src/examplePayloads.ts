






const staticDate = new Date("2024-01-01");







export const listSharesExamplePayload = {
  data: [
    {
      name: "example",
      snapshot: "snapshot-v1",
      properties: {
        lastModified: staticDate,
        etag: "",
        quota: 1,
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ] as any,
};





export const createShareExamplePayload = {
  data: {
    etag: '"0x8DCBC8DAE40E4E3"',
    lastModified: staticDate,
    requestId: "00000000-0000-0000-0000-000000000000",
    version: "2024-01-01",
    date: staticDate,
    errorCode: undefined,
  },
};





export const deleteShareExamplePayload = {
  data: {
    requestId: "59c230c3-201a-003c-0a78-eee158000000",
    version: "2024-08-04",
    date: staticDate,
    errorCode: undefined,
  },
};







export const listFolderExamplePayload = {
  data: [
    {
      kind: "file",
      name: "example.txt",
      fileId: "13835168006444941312",
      properties: {
        contentLength: 97977707,
        creationTime: staticDate,
        lastAccessTime: staticDate,
        lastWriteTime: staticDate,
        changeTime: staticDate,
        lastModified: staticDate,
        etag: '"0x8DCBC8DAE40E4E3"',
      },
      attributes: undefined,
      permissionKey: undefined,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ] as any,
};





export const createFolderExamplePayload = {
  data: {
    etag: '"0x8DCBC8DAE40E4E3"',
    lastModified: staticDate,
    requestId: "60ef1f64-001a-0059-257e-ee4f1c000000",
    version: "2024-08-04",
    date: staticDate,
    isServerEncrypted: true,
    filePermissionKey: "125839117919254299*7594252119313965202",
    fileAttributes: "Directory",
    fileCreatedOn: staticDate,
    fileLastWriteOn: staticDate,
    fileChangeOn: staticDate,
    fileId: "13835187797654241280",
    fileParentId: "0",
    errorCode: "",
  },
};





export const deleteFolderExamplePayload = {
  data: {
    requestId: "60ef1f68-001a-0059-277e-ee4f1c000000",
    version: "2024-08-04",
    date: staticDate,
    errorCode: "",
  },
};







export const uploadFileExamplePayload = {
  data: {
    etag: '"0x8DCBC8DAE40E4E3"',
    lastModified: staticDate,
    requestId: "88aee12f-f01a-0062-128c-ee0ab8000000",
    version: "2024-08-04",
    date: staticDate,
    isServerEncrypted: true,
    filePermissionKey: "13962526983299172380*7594252119313965202",
    fileAttributes: "Archive",
    fileCreatedOn: staticDate,
    fileLastWriteOn: staticDate,
    fileChangeOn: staticDate,
    fileId: "13835143817189130240",
    fileParentId: "0",
    errorCode: "",
  },
};





export const saveFromUrlExamplePayload = {
  data: {
    etag: '"0x8DCBC8DAE40E4E3"',
    lastModified: staticDate,
    requestId: "88aee12f-f01a-0062-128c-ee0ab8000000",
    version: "2024-08-04",
    date: staticDate,
    isServerEncrypted: true,
    filePermissionKey: "13962526983299172380*7594252119313965202",
    fileAttributes: "Archive",
    fileCreatedOn: staticDate,
    fileLastWriteOn: staticDate,
    fileChangeOn: staticDate,
    fileId: "13835143817189130240",
    fileParentId: "0",
    errorCode: "",
  },
};





export const downloadFileExamplePayload = {
  data: Buffer.from("example"),
  contentType: "application/octet",
};





export const deleteFileExamplePayload = {
  data: {
    requestId: "5301e6a9-601a-0012-3591-eeb34f000000",
    version: "2024-08-04",
    date: staticDate,
    errorCode: "",
  },
};





export const copyFileExamplePayload = {
  data: {
    etag: '"0x8DCBCA822E54285"',
    lastModified: staticDate,
    requestId: "5301e6a8-601a-0012-3491-eeb34f000000",
    version: "2024-08-04",
    date: staticDate,
    copyId: "e6c57686-c2c8-4340-9d3b-420300d8f4f3",
    copyStatus: "success",
    errorCode: "",
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any,
};
