import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ASYNC_DATA_EXTENSIONS_PATH } from "../../constants";
import { asyncUpsertRowsExamplePayload } from "../../examplePayloads";
import { asyncUpsertRowsInputs } from "../../inputs";

export const asyncUpsertRows = action({
  examplePayload: asyncUpsertRowsExamplePayload,
  display: {
    label: "Async Upsert Data Extension Rows",
    description:
      "Asynchronously insert or update multiple rows in a data extension.",
  },
  inputs: asyncUpsertRowsInputs,
  perform: async (context, { connection, dataExtensionKey, batchRows }) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      items: batchRows,
    };

    const { data } = await client.put(
      `${ASYNC_DATA_EXTENSIONS_PATH}/key:${encodeURIComponent(dataExtensionKey)}/rows`,
      body,
    );

    return { data };
  },
});
