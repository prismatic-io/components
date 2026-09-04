import { dataSource } from "@prismatic-io/spectral";
import { createArenaClient } from "../client";
import { qualityProcessTemplatesPicklistExamplePayload } from "../examplePayloads";
import { qualityProcessTemplatesPicklistInputs } from "../inputs";
import { handleArenaError } from "../util";
export const qualityProcessTemplatesPicklist = dataSource({
  display: {
    label: "Select Quality Process Template",
    description:
      "Select from available Arena quality process templates (returns GUID as key).",
  },
  dataSourceType: "picklist",
  inputs: qualityProcessTemplatesPicklistInputs,
  perform: async (context, { connection }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Fetching quality process templates for datasource");
      const response = await client.get("/settings/qualityprocesses/templates");
      context.logger.info(
        `Successfully retrieved ${response.data?.count || 0} quality process templates`,
      );
      const results =
        response.data?.results?.map(
          (template: { name: string; guid: string }) => ({
            label: template.name || "Unnamed Template",
            key: template.guid,
          }),
        ) || [];
      return { result: results };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        "Get Quality Process Templates Datasource",
      );
      return { result: [] };
    }
  },
  examplePayload: qualityProcessTemplatesPicklistExamplePayload,
});
