import { action, outputSchema } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createArenaClient } from "../../client";
import { updateFileContentExamplePayload } from "../../examplePayloads";
import { updateFileContentInputs } from "../../inputs";
import { updateFileContentOutputSchema } from "../../outputSchemas";
import { appendFilePart, handleArenaError } from "../../util";
export const updateFileContent = action({
  display: {
    label: "Update File Content",
    description:
      "Upload and update file content by its GUID with multipart form data.",
  },
  inputs: updateFileContentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateFileContentOutputSchema,
  }),
  examplePayload: updateFileContentExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(`Updating file content for file ${params.fileGuid}`);
      const formData = new FormData();
      appendFilePart(formData, "content", params.fileContent, "updated_file");
      const { data } = await client.post(
        `/files/${params.fileGuid}/content`,
        formData,
        {
          headers: {
            ...formData.getHeaders(),
          },
        },
      );
      context.logger.info(
        `Successfully updated file content for ${params.fileGuid}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Update File Content");
    }
  },
});
