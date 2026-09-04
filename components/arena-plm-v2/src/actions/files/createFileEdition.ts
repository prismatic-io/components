import { action, outputSchema } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createArenaClient } from "../../client";
import { createFileEditionExamplePayload } from "../../examplePayloads";
import { createFileEditionInputs } from "../../inputs";
import { fileDetailSchema } from "../../outputSchemas";
import { appendFilePart, handleArenaError } from "../../util";
export const createFileEdition = action({
  display: {
    label: "Create File Edition",
    description: "Upload file to create next edition by file GUID.",
  },
  inputs: createFileEditionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileDetailSchema,
  }),
  examplePayload: createFileEditionExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(
        `Creating new file edition for file ${params.fileGuid}`,
      );
      const formData = new FormData();
      appendFilePart(formData, "content", params.fileContent, "new_edition");
      if (params.storageMethodName) {
        formData.append("storageMethodName", params.storageMethodName);
      }
      if (params.location) {
        formData.append("location", params.location);
      }
      if (params.title) {
        formData.append("title", params.title);
      }
      if (params.description) {
        formData.append("description", params.description);
      }
      if (params.format) {
        formData.append("format", params.format);
      }
      const { data } = await client.post(
        `/files/${params.fileGuid}/editions`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        },
      );
      context.logger.info(
        `Successfully created new file edition for ${params.fileGuid}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Create File Edition");
    }
  },
});
