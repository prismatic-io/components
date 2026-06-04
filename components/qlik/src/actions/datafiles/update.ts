import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createClient } from "../../client";
import {
  connectionInput,
  dataFileId,
  fileInput,
  fileName,
  json,
} from "../../inputs";

export const updateDataFile = action({
  display: {
    label: "Update Data File",
    description: "Updates the information for a specific Data File.",
  },
  perform: async (
    context,
    { connection, dataFileId, json, fileInput, fileName },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data: fileData, contentType } = fileInput;

    const formData = new FormData();
    formData.append("File", fileData, {
      contentType,
      filename: fileName,
    });
    json.name = fileName;
    formData.append("Json", JSON.stringify(json));

    const { data } = await client.put(
      `/data-files/${dataFileId}`,
      formData.getBuffer(),
      {
        headers: formData.getHeaders(),
      },
    );

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    dataFileId,
    fileInput,
    fileName,
    json,
  },
});
