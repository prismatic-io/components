import { dataSource } from "@prismatic-io/spectral";
import { createArenaClient } from "../client";
import { numberSequencePrefixesPicklistExamplePayload } from "../examplePayloads";
import { numberSequencePrefixesPicklistInputs } from "../inputs";
import type { NumberSequencePrefixCompactResultRep } from "../types";
import { handleArenaError } from "../util";
export const numberSequencePrefixesPicklist = dataSource({
  display: {
    label: "Select Number Sequence Prefix",
    description:
      "Select from available number sequence prefixes for the specified object type.",
  },
  dataSourceType: "picklist",
  inputs: numberSequencePrefixesPicklistInputs,
  perform: async (context, { connection, objectType }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Fetching ${objectType} number sequence prefixes for datasource`,
        {
          objectType,
        },
      );
      const response = await client.get(
        `/settings/${objectType}/numbersequenceprefixes`,
      );
      context.logger.info(
        `Successfully retrieved ${response.data?.count || 0} ${objectType} number sequence prefixes for datasource`,
      );
      const responseData =
        response.data as NumberSequencePrefixCompactResultRep;
      const results =
        responseData.results?.map((prefix) => ({
          label: prefix.value || "Unknown Prefix",
          key: prefix.value || "",
        })) || [];
      return { result: results };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        `Get ${objectType} Number Sequence Prefixes Datasource`,
      );
      return { result: [] };
    }
  },
  examplePayload: numberSequencePrefixesPicklistExamplePayload,
});
