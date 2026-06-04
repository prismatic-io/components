import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createClient } from "../../client";
import { connectionInput, fileInput, fileName, json } from "../../inputs";

export const createDataFile = action({
  display: {
    label: "Create Data File",
    description: "Upload a new data file.",
  },
  perform: async (context, { connection, json, fileInput, fileName }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data: fileData, contentType } = fileInput;

    const formData = new FormData();
    formData.append("File", fileData, {
      contentType,
      filename: fileName,
    });
    json.name = fileName;
    formData.append("Json", JSON.stringify(json));

    const { data } = await client.post(`/data-files`, formData.getBuffer(), {
      headers: formData.getHeaders(),
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    fileInput,
    fileName,
    json,
  },
});
