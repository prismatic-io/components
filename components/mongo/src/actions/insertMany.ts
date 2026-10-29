import { action } from "@prismatic-io/spectral";
import { documentList, connectionInput } from "../inputs";
import { createClient } from "../client";
import { toDocument } from "../util";
import type { ErrorWithMessage } from "../types";
import { insertManyExamplePayload } from "../examplePayloads";

const insertMany = action({
  display: {
    label: "Insert Many",
    description: "Insert new documents into a collection",
  },
  perform: async (context, { documentList, mongoConnection }) => {
    const { dbConnection, client } = await createClient({
      connection: mongoConnection,
      debug: context.debug.enabled,
      logger: context.logger,
    });
    try {
      const documents = (documentList || []).map((v) => toDocument(v));
      return {
        data: await client.insertMany(documents),
      };
    } catch (error) {
      throw new Error(
        `Failed to insert documents: ${(error as ErrorWithMessage).message}`,
      );
    } finally {
      await dbConnection.close(true);
    }
  },
  inputs: {
    documentList,
    mongoConnection: connectionInput,
  },
  examplePayload: insertManyExamplePayload,
});

export default insertMany;
