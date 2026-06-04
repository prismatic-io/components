import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { aggregationOptions, connectionInput, pipeline } from "../inputs";
import { aggregateExamplePayload } from "../examplePayloads";
import type { ErrorWithMessage } from "../types";

export const aggregate = action({
  display: {
    label: "Aggregate",
    description:
      "Performs an aggregation operation using the provided aggregation pipeline.",
  },
  perform: async (
    context,
    { pipeline, aggregationOptions, mongoConnection },
  ) => {
    const results = [];
    const { client, dbConnection } = await createClient({
      connection: mongoConnection,
      debug: context.debug.enabled,
      logger: context.logger,
    });

    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      const cursor = client.aggregate(pipeline, aggregationOptions);
      for await (const doc of cursor) {
        results.push(doc);
      }

      return {
        data: results,
      };
    } catch (error) {
      throw new Error(
        `Failed to aggregate documents: ${(error as ErrorWithMessage).message}`,
      );
    } finally {
      await dbConnection.close(true);
    }
  },
  inputs: {
    mongoConnection: connectionInput,
    pipeline,
    aggregationOptions,
  },
  examplePayload: aggregateExamplePayload,
});
