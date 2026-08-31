export const downloadFileExamplePayload = {
  data: Buffer.from("example"),
  contentType: "application/octet-stream",
};
export const uploadFileExamplePayload = {
  data: {
    total_count: 1,
    entries: [
      {
        id: "54321",
        type: "file",
        name: "report.pdf",
        sha1: "85136c79cbf9fe36bb9d05d0639c70c265c18d37",
        file_version: {
          id: "12345",
          type: "file_version",
          sha1: "134b65991ed521fcfe4724b7d814ab8ded5185dc",
        },
        parent: { id: "0", type: "folder", name: "All Files" },
      },
    ],
  },
};
export const getFileDownloadUrlExamplePayload = {
  data: "https://dl.boxcloud.com/d/1/b1!abc123-example-download-url/download",
};
