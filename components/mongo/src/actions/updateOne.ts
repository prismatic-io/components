import { action } from "@prismatic-io/spectral";
import {
  documentUpdate,
  connectionInput,
  queryFilter,
  upsert,
} from "../inputs";
import { createClient } from "../client";
import { updateOneExamplePayload } from "../examplePayloads";
import type { ErrorWithMessage } from "../types";

const updateOne = action({
  display: {
    label: "Update One",
    description: "Update a single document in a collection",
  },
  perform: async (
    context,
    { document, documentUpdate, mongoConnection, upsert },
  ) => {
    const { client, dbConnection } = await createClient({
      connection: mongoConnection,
      debug: context.debug.enabled,
      logger: context.logger,
    });

    try {
      return {
        data: await client.updateOne(
          document,
          {
            $set: documentUpdate,
          },
          { upsert },
        ),
      };
    } catch (error) {
      throw new Error(
        `Failed to update document: ${(error as ErrorWithMessage).message}`,
      );
    } finally {
      await dbConnection.close(true);
    }
  },
  inputs: {
    document: queryFilter, 
    documentUpdate,
    mongoConnection: connectionInput,
    upsert,
  },
  examplePayload: updateOneExamplePayload,
});

export default updateOne;
