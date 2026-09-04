import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listQualityProcessesExamplePayload } from "../../examplePayloads";
import { listQualityProcessesInputs } from "../../inputs";
import { qualityProcessListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
import { fetchArenaList } from "../../util/pagination";
export const listQualityProcesses = action({
  display: {
    label: "List Quality Processes",
    description:
      "Get quality processes from Arena PLM system with search and filtering options.",
  },
  inputs: listQualityProcessesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: qualityProcessListSchema,
  }),
  examplePayload: listQualityProcessesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const queryParams = {
        number: params.number,
        name: params.name,
        description: params.description,
        "template.guid": params.templateGuid,
        type: params.type,
        "owner.fullName": params.ownerFullName,
        "owner.guid": params.ownerGuid,
        status: params.status,
        "creator.fullName": params.creatorFullName,
        "creator.guid": params.creatorGuid,
        limit: params.pagination?.limit,
        offset: params.pagination?.offset,
      };
      const data = await fetchArenaList(
        client,
        "/qualityprocesses",
        queryParams,
        params.fetchAll,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Quality Processes");
    }
  },
});
