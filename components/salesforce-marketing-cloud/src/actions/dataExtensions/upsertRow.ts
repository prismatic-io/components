import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { DATA_EVENTS_PATH } from "../../constants";
import { upsertRowExamplePayload } from "../../examplePayloads";
import { upsertRowInputs } from "../../inputs";

export const upsertRow = action({
  examplePayload: upsertRowExamplePayload,
  display: {
    label: "Upsert Data Extension Row",
    description:
      "Insert or update a single row in a data extension by primary key.",
  },
  inputs: upsertRowInputs,
  perform: async (
    context,
    { connection, dataExtensionKey, primaryKeys, rowData },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      keys: primaryKeys,
      values: rowData,
    };

    const { data } = await client.post(
      `${DATA_EVENTS_PATH}/key:${encodeURIComponent(dataExtensionKey)}/rowset`,
      [body],
    );

    return { data };
  },
});
