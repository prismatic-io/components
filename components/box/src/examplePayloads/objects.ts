export const pathDetailsExamplePayload = {
  data: [{ id: "12345", type: "file", name: "Quarterly Report.pdf" }],
};
export const moveObjectExamplePayload = {
  data: {
    type: "folder",
    id: "67890",
    name: "Archive",
    parent: { id: "0", type: "folder", name: "All Files" },
  },
};
export const copyObjectExamplePayload = {
  data: {
    type: "folder",
    id: "98765",
    name: "Documents Backup",
    parent: { id: "0", type: "folder", name: "All Files" },
  },
};
export const deleteObjectExamplePayload = {
  data: {},
};
