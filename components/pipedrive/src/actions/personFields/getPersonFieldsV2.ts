import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  cursor,
  fetchAll,
  paginationLimitInput,
} from "../../inputs";
import { paginateRecordsWithCursor } from "../../util";
import { WebhookVersion } from "../../constants";
export const getPersonFieldsV2 = action({
  display: {
    label: "Get Person Fields (V2)",
    description: "Gets all person fields.",
  },
  perform: async (context, { connection, limit, fetchAll, cursor }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const data = await paginateRecordsWithCursor(
      client,
      "personFields",
      {
        limit,
        cursor,
      },
      fetchAll,
    );
    return { data };
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    limit: paginationLimitInput,
    cursor,
  },
});
