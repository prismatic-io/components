import { action, outputSchema } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createArenaClient } from "../../client";
import { createItemFileAssociationExamplePayload } from "../../examplePayloads";
import { createItemFileAssociationInputs } from "../../inputs";
import { itemFileSchema } from "../../outputSchemas";
import type { ItemFileVo } from "../../types";
import { handleArenaError } from "../../util";
export const createItemFileAssociation = action({
  display: {
    label: "Create Item File Association",
    description:
      "Upload a new file and associate it with an item in Arena PLM system (multipart/form-data).",
  },
  inputs: createItemFileAssociationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: itemFileSchema,
  }),
  examplePayload: createItemFileAssociationExamplePayload,
  perform: async (
    context,
    {
      connection,
      itemGuid,
      file,
      title,
      description,
      format,
      isPrivate,
      authorFullName,
      categoryGuid,
      storageMethodName,
      edition,
      latestEditionAssociation,
      primary,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const formData = new FormData();
      if (file?.data) {
        formData.append("file", file.data, {
          filename: title || "upload",
          contentType: file.contentType,
        });
      }
      if (title) formData.append("file.title", title);
      if (description) formData.append("file.description", description);
      if (format) formData.append("file.format", format);
      if (isPrivate !== undefined)
        formData.append("file.private", String(isPrivate));
      if (authorFullName)
        formData.append("file.author.fullName", authorFullName);
      if (categoryGuid) formData.append("file.category.guid", categoryGuid);
      if (storageMethodName)
        formData.append("file.storageMethodName", storageMethodName);
      if (edition) formData.append("file.edition", edition);
      if (latestEditionAssociation !== undefined)
        formData.append(
          "latestEditionAssociation",
          String(latestEditionAssociation),
        );
      if (primary !== undefined) formData.append("primary", String(primary));
      context.logger.info("Creating item file association", {
        itemGuid,
        hasFile: !!file?.data,
        title,
        primary,
        latestEditionAssociation,
      });
      const response = await client.post(`/items/${itemGuid}/files`, formData, {
        headers: { ...formData.getHeaders() },
      });
      const fileAssociation: ItemFileVo = response.data;
      context.logger.info("Item file association created successfully", {
        itemGuid,
        associationGuid: fileAssociation.guid,
        fileName: fileAssociation.file?.name,
        primary: fileAssociation.primary,
        latestEditionAssociation: fileAssociation.latestEditionAssociation,
      });
      return { data: fileAssociation };
    } catch (error) {
      handleArenaError(
        error,
        context.logger,
        `Create Item File Association (${itemGuid})`,
      );
    }
  },
});
