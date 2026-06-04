import { action } from "@prismatic-io/spectral";
import {
  queryFilter,
  connectionInput,
  limit,
  skip,
  comparisonOperator,
  convertValuesToNumbers,
} from "../inputs";
import { createClient } from "../client";
import {
  detectAndConvertValuesToNumbers,
  getComparisonQueryFilter,
} from "../util";
import { findAllExamplePayload } from "../examplePayloads";

import type { ErrorWithMessage } from "../types";

const findAll = action({
  display: {
    label: "Find All",
    description: "Retrieve all documents in a collection that match a query.",
  },
  perform: async (
    context,
    {
      queryFilter,
      comparisonOperator,
      convertValuesToNumbers,
      mongoConnection,
      limit,
      skip,
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
        data: (
          await client
            .find(
              comparisonOperator
                ? getComparisonQueryFilter(comparisonOperator, queryFilter)
                : queryFilter,
              { limit, skip },
            )
            .toArray()
        ).map((document) => ({
          ...document,
          id: document._id.toString(), 
        })),
      };
    } catch (error) {
      throw new Error(
        `Failed to find documents: ${(error as ErrorWithMessage).message}`,
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
    limit,
    skip,
  },
  examplePayload: findAllExamplePayload,
});

export default findAll;
