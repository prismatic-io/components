import { action } from "@prismatic-io/spectral";
import { connectionInput, queryFilter } from "../inputs";
import { createClient } from "../client";
import type { ErrorWithMessage } from "../types";
import { deleteManyExamplePayload } from "../examplePayloads";

const deleteMany = action({
  display: {
    label: "Delete Many",
    description: "Remove documents from a collection that match a query.",
  },
  perform: async (context, { document, mongoConnection }) => {
    const { dbConnection, client } = await createClient({
      connection: mongoConnection,
      debug: context.debug.enabled,
      logger: context.logger,
    });
    try {
      return {
        data: await client.deleteMany(document),
      };
    } catch (error) {
      throw new Error(
        `Failed to delete documents: ${(error as ErrorWithMessage).message}`,
      );
    } finally {
      await dbConnection.close(true);
    }
  },
  inputs: {
    document: queryFilter, 
    mongoConnection: connectionInput,
  },
  examplePayload: deleteManyExamplePayload,
});

export default deleteMany;
