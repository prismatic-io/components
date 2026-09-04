import { action, outputSchema } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createArenaClient } from "../../client";
import { runImportExamplePayload } from "../../examplePayloads";
import { runImportInputs } from "../../inputs";
import { runResponseWithGuidSchema } from "../../outputSchemas";
import { appendFilePart, handleArenaError } from "../../util";
export const runImport = action({
  display: {
    label: "Run Import",
    description:
      "Execute an import definition and create a new import run with file uploads.",
  },
  inputs: runImportInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: runResponseWithGuidSchema,
  }),
  examplePayload: runImportExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      context.logger.info(`Running import ${params.importGuid}`);
      const formData = new FormData();
      appendFilePart(
        formData,
        "submitContent",
        params.submitContent,
        "submit_content",
      );
      appendFilePart(
        formData,
        "fileContent",
        params.fileContent,
        "file_content",
      );
      const queryParams = {
        submitFileType: params.submitFileType,
        commit: params.commit,
        submitWorksheetName: params.submitWorksheetName,
        debug: params.debug,
        actor: params.actor,
      };
      const endpoint = `/imports/${params.importGuid}/runs`;
      const { data } = await client.post(endpoint, formData, {
        params: queryParams,
        headers: {
          ...formData.getHeaders(),
        },
      });
      context.logger.info(
        `Successfully started import run with GUID: ${data?.guid}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Run Import");
    }
  },
});
