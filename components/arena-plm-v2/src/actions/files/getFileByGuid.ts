import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getFileByGuidExamplePayload } from "../../examplePayloads";
import { getFileByGuidInputs } from "../../inputs";
import { fileDetailSchema } from "../../outputSchemas";
import type { FileDetailVo } from "../../types";
import { handleArenaError } from "../../util";
export const getFileByGuid = action({
  display: {
    label: "Get File by GUID",
    description: "Get file details by GUID from Arena PLM system.",
  },
  inputs: getFileByGuidInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fileDetailSchema,
  }),
  examplePayload: getFileByGuidExamplePayload,
  perform: async (context, { connection, fileGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Retrieving file from Arena", {
        fileGuid,
      });
      const response = await client.get(`/files/${fileGuid}`);
      const fileDetail: FileDetailVo = response.data;
      context.logger.info("File retrieved successfully", {
        fileGuid,
        fileName: fileDetail.name,
        fileTitle: fileDetail.title,
        fileNumber: fileDetail.number,
        format: fileDetail.format,
        size: fileDetail.size,
        edition: fileDetail.edition,
        latest: fileDetail.latest,
        hasMarkup: fileDetail.hasMarkup,
        checkedOut: fileDetail.checkedOut,
        locked: fileDetail.locked,
      });
      return { data: fileDetail };
    } catch (error) {
      handleArenaError(error, context.logger, `Get File by GUID (${fileGuid})`);
    }
  },
});
