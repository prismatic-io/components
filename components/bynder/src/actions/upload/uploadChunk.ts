import { basename } from "node:path";
import { action } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import FormData from "form-data";
import { parseStringPromise } from "xml2js";
import { uploadChunkResponse } from "../../examplePayloads";
import { chunk, chunks, file, multipartParams, uploadURL } from "../../inputs";

export const uploadChunk = action({
  display: {
    label: "Upload Chunk",
    description: "Upload a chunk of a file.",
  },
  inputs: {
    uploadURL,
    file,
    chunk,
    chunks,
    multipartParams,
  },
  perform: async (
    context,
    { chunk, chunks, file, multipartParams, uploadURL },
  ) => {
    const { data: fileData } = file;
    if (!multipartParams?.key) {
      throw new Error("Missing key in multipart params");
    }
    const { key } = multipartParams;
    const locationFilename = `${key}/p${chunk}`;
    const params = Object.assign(multipartParams, {
      name: `${basename(key as string)}/p${chunk}`,
      chunk: chunk,
      chunks,
      Filename: locationFilename,
      key: locationFilename,
    });
    const formData = new FormData();
    for (const [key, value] of Object.entries(params)) {
      formData.append(key, value);
    }
    formData.append("file", fileData);
    const client = createClient({
      debug: context.debug.enabled,
      baseUrl: uploadURL,
    });
    const { data } = await client.post("", formData, {
      headers: Object.assign(formData.getHeaders(), {
        "content-length": formData.getLengthSync(),
      }),
    });
    const jsonResponse = await parseStringPromise(data);
    return { data: { ...jsonResponse, filename: locationFilename } };
  },
  examplePayload: {
    data: uploadChunkResponse,
  },
});
