import { action, outputSchema } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createArenaClient } from "../../client";
import { createFileMarkupExamplePayload } from "../../examplePayloads";
import { createFileMarkupInputs } from "../../inputs";
import { fileAssociationMarkupSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const createFileMarkup = action({
  display: {
    label: "Create File Markup",
    description: "Upload a markup file for a file (multipart/form-data).",
  },
  inputs: createFileMarkupInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileAssociationMarkupSchema,
  }),
  examplePayload: createFileMarkupExamplePayload,
  perform: async (
    context,
    {
      connection,
      fileGuid,
      markupContent,
      reserved,
      markupStorageMethodName,
      markupCategoryGuid,
      markupTitle,
      markupFormat,
      markupAuthorFullName,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const formData = new FormData();
      if (reserved !== undefined) formData.append("reserved", String(reserved));
      if (markupContent?.data) {
        formData.append("markup.content", markupContent.data, {
          filename: "markup",
          contentType: markupContent.contentType,
        });
      }
      if (markupStorageMethodName)
        formData.append("markup.storageMethodName", markupStorageMethodName);
      if (markupCategoryGuid)
        formData.append("markup.category.guid", markupCategoryGuid);
      if (markupTitle) formData.append("markup.title", markupTitle);
      if (markupFormat) formData.append("markup.format", markupFormat);
      if (markupAuthorFullName)
        formData.append("markup.author.fullName", markupAuthorFullName);
      context.logger.info("Creating file markup", { fileGuid });
      const { data } = await client.post(
        `/files/${fileGuid}/markups`,
        formData,
        { headers: { ...formData.getHeaders() } },
      );
      context.logger.info("File markup created successfully", { fileGuid });
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Create File Markup");
    }
  },
});
