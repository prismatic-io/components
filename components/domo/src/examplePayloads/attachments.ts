











export const addAttachmentExamplePayload = {
  data: {
    id: 5001,
    name: "requirements-doc.pdf",
    mediaType: "application/pdf",
    fileSize: 204800,
    taskId: 2001,
    projectId: 7,
    uploadedBy: 87264918,
    uploadedAt: "2024-03-22T11:00:00.000Z",
  },
};

export const deleteAttachmentExamplePayload = { data: null };

export const downloadAttachmentExamplePayload = {
  data: "<binary file content>",
};

export const getListOfAttachmentsExamplePayload = {
  data: [
    addAttachmentExamplePayload.data,
    {
      id: 5002,
      name: "schema-diagram.png",
      mediaType: "image/png",
      fileSize: 98304,
      taskId: 2001,
      projectId: 7,
      uploadedBy: 54320910,
      uploadedAt: "2024-03-23T09:15:00.000Z",
    },
  ],
};
