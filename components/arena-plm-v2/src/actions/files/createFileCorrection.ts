import { action, outputSchema } from "@prismatic-io/spectral";
import FormData from "form-data";
import { createArenaClient } from "../../client";
import { createFileCorrectionExamplePayload } from "../../examplePayloads";
import { createFileCorrectionInputs } from "../../inputs";
import { fileCorrectionSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const createFileCorrection = action({
  display: {
    label: "Create File Correction",
    description: "Upload a corrected version of a file (multipart/form-data).",
  },
  inputs: createFileCorrectionInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileCorrectionSchema,
  }),
  examplePayload: createFileCorrectionExamplePayload,
  perform: async (
    context,
    {
      connection,
      fileGuid,
      content,
      comments,
      storageMethodName,
      removeOriginalContent,
      haveContent,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const formData = new FormData();
      if (content?.data) {
        formData.append("content", content.data, {
          filename: "correction",
          contentType: content.contentType,
        });
      }
      if (comments) formData.append("comments", comments);
      if (storageMethodName)
        formData.append("storageMethodName", storageMethodName);
      if (removeOriginalContent !== undefined)
        formData.append("removeOriginalContent", String(removeOriginalContent));
      if (haveContent !== undefined)
        formData.append("haveContent", String(haveContent));
      context.logger.info("Creating file correction", { fileGuid });
      const { data } = await client.post(
        `/files/${fileGuid}/corrections`,
        formData,
        { headers: { ...formData.getHeaders() } },
      );
      context.logger.info("File correction created successfully", { fileGuid });
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Create File Correction");
    }
  },
});
