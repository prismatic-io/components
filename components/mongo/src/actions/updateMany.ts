import { action } from "@prismatic-io/spectral";
import {
  comparisonOperator,
  connectionInput,
  convertValuesToNumbers,
  documentUpdate,
  queryFilter,
  upsert,
} from "../inputs";
import { createClient } from "../client";
import {
  detectAndConvertValuesToNumbers,
  getComparisonQueryFilter,
} from "../util";
import { updateManyExamplePayload } from "../examplePayloads";
import type { ErrorWithMessage } from "../types";

export const updateMany = action({
  display: {
    label: "Update Many",
    description: "Update multiple documents in a collection",
  },
  perform: async (
    context,
    {
      upsert,
      queryFilter,
      mongoConnection,
      documentUpdate,
      convertValuesToNumbers,
      comparisonOperator,
    },
  ) => {
    const { client, dbConnection } = await createClient({
      connection: mongoConnection,
      debug: context.debug.enabled,
      logger: context.logger,
    });

    try {
      if (convertValuesToNumbers) detectAndConvertValuesToNumbers(queryFilter);

      return {
        data: await client.updateMany(
          comparisonOperator
            ? getComparisonQueryFilter(comparisonOperator, queryFilter)
            : queryFilter,
          {
            $set: documentUpdate,
          },
          { upsert },
        ),
      };
    } catch (error) {
      throw new Error(
        `Failed to update documents: ${(error as ErrorWithMessage).message}`,
      );
    } finally {
      await dbConnection.close(true);
    }
  },
  inputs: {
    mongoConnection: connectionInput,
    queryFilter,
    comparisonOperator,
    documentUpdate,
    convertValuesToNumbers,
    upsert,
  },
  examplePayload: updateManyExamplePayload,
});
