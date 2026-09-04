import { action, outputSchema } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createArenaClient } from "../../client";
import { createFileWithContentExamplePayload } from "../../examplePayloads";
import { createFileWithContentInputs } from "../../inputs";
import { fileDetailSchema } from "../../outputSchemas";
import { getFilenameFromContentType, handleArenaError } from "../../util";
export const createFileWithContent = action({
  display: {
    label: "Create File With Content",
    description:
      "Upload a file to Arena PLM system with specified metadata. Supports files up to 2GB.",
  },
  inputs: createFileWithContentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileDetailSchema,
  }),
  examplePayload: createFileWithContentExamplePayload,
  perform: async (
    context,
    {
      connection,
      file,
      title,
      description,
      format,
      storageMethodName,
      categoryGuid,
      authorFullName,
      edition,
      private: isPrivate,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const formData = new FormData();
      if (file.data) {
        const filename =
          getFilenameFromContentType(file.contentType, format) || "upload";
        formData.append("content", file.data, {
          filename: filename,
          contentType: file.contentType,
        });
      }
      if (title) formData.append("title", title);
      if (description) formData.append("description", description);
      if (format) formData.append("format", format);
      if (storageMethodName)
        formData.append("storageMethodName", storageMethodName);
      if (categoryGuid) formData.append("category.guid", categoryGuid);
      if (authorFullName) formData.append("author.fullName", authorFullName);
      if (edition) formData.append("edition", edition);
      if (isPrivate !== undefined)
        formData.append("private", isPrivate.toString());
      const { data } = await client.post("/files", formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Create File With Content");
    }
  },
});
