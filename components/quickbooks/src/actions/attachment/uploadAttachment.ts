import { action } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createHttpClient } from "../../client";
import {
  connectionInput,
  entityRefType,
  entityRefValue,
  file,
  fileName,
  fileType,
  includeOnSend,
  minorVersion,
  note,
} from "../../inputs";

export const uploadAttachment = action({
  display: {
    label: "Upload Attachment",
    description: "Upload an attachment to an object.",
  },
  perform: async (
    context,
    {
      connection,
      file,
      fileName,
      entityRefValue,
      entityRefType,
      note,
      minorVersion,
      fileType,
      includeOnSend,
    },
  ) => {
    const client = createHttpClient(connection, context.debug.enabled);
    const metadata: Record<string, unknown> = {
      FileName: fileName,
      ContentType: fileType,
      ...(note && { Note: note }),
    };

    const attachableRef: Array<object> = [];

    if (entityRefType || entityRefValue) {
      attachableRef.push({
        IncludeOnSend: includeOnSend,
        EntityRef: {
          ...(entityRefType && { type: entityRefType }),
          ...(entityRefValue && { value: entityRefValue }),
        },
      });

      metadata.AttachableRef = attachableRef;
    }
    const fileData = file.data;
    const form = new FormData();

    form.append("file_metadata_01", JSON.stringify(metadata), {
      contentType: "application/json",
    });

    form.append("file_content_01", fileData, {
      filename: fileName,
      contentType: fileType,
    });

    const { data } = await client.post("/upload", form, {
      headers: {
        ...form.getHeaders(),
        "Content-Length": form.getLengthSync(),
        Accept: "application/json",
      },
      params: { minorversion: minorVersion },
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    file,
    fileName,
    entityRefValue,
    entityRefType,
    note,
    minorVersion: { ...minorVersion, default: "75" },
    fileType,
    includeOnSend,
  },
});
