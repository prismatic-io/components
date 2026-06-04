import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { downloadFileInputs as inputs } from "../../inputs/files";
import type { DownloadFileResponse } from "../../interfaces/files";
import { downloadFileExamplePayload as examplePayload } from "../../examplePayloads/files";

export const downloadFile = action({
  display: {
    label: "Download File",
    description: "Download a file.",
  },
  perform: async (
    context,
    { connection, file_type, domain_hash, resource_name },
  ) => {
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).get<DownloadFileResponse>(
      `/${file_type}/download/${domain_hash}/${resource_name}`,
    );

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
