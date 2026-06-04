












export const readFileExamplePayload = {
  data: "Sample file contents",
  contentType: "text/plain",
};

export const fastGetExamplePayload = {
  data: Buffer.from("Sample file contents"),
  contentType: "text/plain",
};


export const writeFileExamplePayload = {
  data: "Uploaded data stream to /upload/path/to/file.txt",
};

export const appendFileExamplePayload = {
  data: "Appended data to /upload/path/to/file.txt",
};


export const deleteFileExamplePayload = {
  data: null,
};

export const moveFileExamplePayload = {
  data: null,
};


export const statFileExamplePayload = {
  data: {
    mode: 33279, 
    uid: 1000, 
    gid: 985, 
    size: 5, 
    accessTime: 1566868566000, 
    modifyTime: 1566868566000, 
    isDirectory: false, 
    isFile: true, 
    isBlockDevice: false, 
    isCharacterDevice: false, 
    isSymbolicLink: false, 
    isFIFO: false, 
    isSocket: false, 
  },
};


export const listDirectoryExamplePayload = {
  data: ["folder1/file.txt", "folder1/subfolder/example.txt", "root.txt"],
};

export const createDirectoryExamplePayload = {
  data: "/path/to/new/directory/",
};











