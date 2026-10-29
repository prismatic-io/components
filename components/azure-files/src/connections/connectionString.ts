import { connection } from "@prismatic-io/spectral";

export const connectionString = connection({
  key: "connectionString",
  display: {
    description: "Authenticate using a connection string.",
    label: "Connection String",
  },
  comments: "Authenticates requests to Azure Files with a connection string.",
  inputs: {
    connectionString: {
      label: "Connection String",
      placeholder: "Enter connection string",
      type: "password",
      required: true,
      shown: true,
      comments: "The connection string for the active directory account.",
      example:
        "BlobEndpoint=https://example.blob.core.windows.net/;QueueEndpoint=https://example.queue.core.windows.net/;FileEndpoint=https://example.file.core.windows.net/;TableEndpoint=https://example.table.core.windows.net/;SharedAccessSignature=sv=example=rwdlacupitfx&se=2024-05-01T03:51:00Z&st=20",
    },
  },
});
