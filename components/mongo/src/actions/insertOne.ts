import { action } from "@prismatic-io/spectral";
import { document, connectionInput } from "../inputs";
import { createClient } from "../client";
import { insertOneExamplePayload } from "../examplePayloads";
import type { ErrorWithMessage } from "../types";

const insertOne = action({
  display: {
    label: "Insert One",
    description: "Insert a new document into a collection",
  },
  perform: async (context, { document, mongoConnection }) => {
    const { dbConnection, client } = await createClient({
      connection: mongoConnection,
      debug: context.debug.enabled,
      logger: context.logger,
    });

    try {
      return {
        data: await client.insertOne(document),
      };
    } catch (error) {
      throw new Error(
        `Failed to insert document: ${(error as ErrorWithMessage).message}`,
      );
    } finally {
      await dbConnection.close(true);
    }
  },
  inputs: {
    document,
    mongoConnection: connectionInput,
  },
  examplePayload: insertOneExamplePayload,
});

export default insertOne;
