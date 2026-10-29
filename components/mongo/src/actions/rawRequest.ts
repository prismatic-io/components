import { action } from "@prismatic-io/spectral";
import { connectionInput, executeCommand, runAdminCommand } from "../inputs";
import { getDbClient } from "../client";
import { rawRequestExamplePayload } from "../examplePayloads";
import type { Document } from "mongodb";
import type { ErrorWithMessage } from "../types";

export const rawRequest = action({
  display: {
    label: "Raw Request",
    description:
      "Execute database commands directly. Does not use collection from connection.",
  },
  perform: async (
    context,
    { mongoConnection, executeCommand, runAdminCommand },
  ) => {
    const { client: db, connection } = await getDbClient({
      connection: mongoConnection,
      debug: context.debug.enabled,
      logger: context.logger,
    });

    try {
      return {
        data: runAdminCommand
          ? await db.admin().command(executeCommand as Document)
          : await db.command(executeCommand as Document),
      };
    } catch (error) {
      throw new Error(
        `Failed to execute command: ${(error as ErrorWithMessage).message}`,
      );
    } finally {
      await connection.close(true);
    }
  },
  inputs: {
    mongoConnection: connectionInput,
    executeCommand,
    runAdminCommand,
  },
  examplePayload: rawRequestExamplePayload,
});
