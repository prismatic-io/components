import { action } from "@prismatic-io/spectral";
import {
  queryFilter,
  connectionInput,
  comparisonOperator,
  convertValuesToNumbers,
} from "../inputs";
import { createClient } from "../client";
import {
  detectAndConvertValuesToNumbers,
  getComparisonQueryFilter,
} from "../util";
import { findOneExamplePayload } from "../examplePayloads";

import type { ErrorWithMessage } from "../types";

const findOne = action({
  display: {
    label: "Find One",
    description:
      "Retrieve one document in a collection that match a query. If no document is found, an error is thrown.",
  },
  perform: async (
    context,
    {
      queryFilter,
      comparisonOperator,
      convertValuesToNumbers,
      mongoConnection,
    },
  ) => {
    const { dbConnection, client } = await createClient({
      connection: mongoConnection,
      debug: context.debug.enabled,
      logger: context.logger,
    });

    try {
      if (convertValuesToNumbers) detectAndConvertValuesToNumbers(queryFilter);
      const document = await client.findOne(
        comparisonOperator
          ? getComparisonQueryFilter(comparisonOperator, queryFilter)
          : queryFilter,
      );
      if (!document) {
        throw new Error("Document not found");
      }

      return {
        data: { ...document, id: document._id.toString() },
      };
    } catch (error) {
      throw new Error(
        `Failed to find document: ${(error as ErrorWithMessage).message}`,
      );
    } finally {
      await dbConnection.close(true);
    }
  },
  inputs: {
    queryFilter,
    comparisonOperator,
    convertValuesToNumbers,
    mongoConnection: connectionInput,
  },
  examplePayload: findOneExamplePayload,
});

export default findOne;
