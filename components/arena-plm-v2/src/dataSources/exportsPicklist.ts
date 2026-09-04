import { dataSource } from "@prismatic-io/spectral";
import { createArenaClient } from "../client";
import { exportsPicklistInputs } from "../inputs";
import type { ExportDefinitionResult } from "../types";
import { handleArenaError } from "../util";
export const exportsPicklist = dataSource({
  display: {
    label: "Select Export",
    description: "Select from Arena export definitions.",
  },
  dataSourceType: "picklist",
  inputs: exportsPicklistInputs,
  perform: async (
    context,
    {
      connection,
      number,
      name,
      description,
      creatorGuid,
      creatorEmail,
      creatorFullName,
      limit,
      offset,
    },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const queryParams = {
        number,
        name,
        description,
        "creator.guid": creatorGuid,
        "creator.email": creatorEmail,
        "creator.fullName": creatorFullName,
        limit,
        offset,
      };
      context.logger.info("Fetching exports for datasource", { queryParams });
      const response = await client.get("/exports", {
        params: queryParams,
      });
      const responseData = response.data as ExportDefinitionResult;
      const result =
        responseData.results
          ?.map((exportDefinition) => {
            const key =
              exportDefinition.guid ||
              (exportDefinition.number !== undefined
                ? String(exportDefinition.number)
                : "");
            const labelParts = [
              exportDefinition.name || "Unnamed Export",
              exportDefinition.number !== undefined
                ? `#${exportDefinition.number}`
                : undefined,
            ].filter(Boolean);
            return {
              label: labelParts.join(" "),
              key,
            };
          })
          .filter((entry) => entry.key) || [];
      return { result };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get Exports Datasource");
      return { result: [] };
    }
  },
});
