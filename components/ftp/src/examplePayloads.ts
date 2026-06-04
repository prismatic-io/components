










interface FileInfoPayload {
  name: string;
  type: number;
  size: number;
  rawModifiedAt: string;
  modifiedAt?: Date;
  permissions?: { user: number; group: number; world: number };
  hardLinkCount?: number;
  link?: string;
  group?: string;
  user?: string;
  uniqueID?: string;
  isDirectory: boolean;
  isFile: boolean;
  isSymbolicLink: boolean;
}

export const listDirectoryExamplePayload: { data: FileInfoPayload[] } = {
  data: [
    {
      name: "reports",
      type: 2, 
      size: 0,
      rawModifiedAt: "Feb  8 22:16",
      permissions: { user: 7, group: 5, world: 5 },
      hardLinkCount: 2,
      group: "ftpusers",
      user: "deploy",
      isDirectory: true,
      isFile: false,
      isSymbolicLink: false,
    },
    {
      name: "invoice-2024-001.pdf",
      type: 1, 
      size: 245760,
      rawModifiedAt: "Jan 23 16:38",
      permissions: { user: 6, group: 4, world: 4 },
      hardLinkCount: 1,
      group: "ftpusers",
      user: "deploy",
      isDirectory: false,
      isFile: true,
      isSymbolicLink: false,
    },
  ],
};




export const readFileExamplePayload = {
  data: Buffer.from("example"),
  contentType: "application/octet-stream",
};


export const deleteFileExamplePayload = null;


export const moveFileExamplePayload = null;


export const writeFileExamplePayload = null;
