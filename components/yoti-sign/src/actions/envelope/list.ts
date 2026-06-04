import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listEnvelopesResponse } from "../../examplePayloads";
import {
  connectionInput,
  fetchAll,
  keyValueParams,
  limit,
  offset,
} from "../../inputs";
import type { Envelope } from "../../interfaces";
import { fetchAllRecords } from "../../util";

export const listEnvelopes = action({
  display: {
    label: `List Envelopes`,
    description:
      "List Envelopes based on the search criteria. If no search criteria is provided, it will return all envelopes.",
  },
  inputs: {
    connection: connectionInput,
    fetchAll,
    offset,
    limit,
    keyValueParams,
  },
  perform: async (
    context,
    { connection, fetchAll, keyValueParams, limit, offset },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const url = `/organisations/envelopes/search`;
    if (fetchAll) {
      const { data, total } = await fetchAllRecords<Envelope>(client, url, {
        ...keyValueParams,
      });
      return {
        data: {
          envelopes: data,
          total,
        },
      };
    }
    const { data } = await client.get(url, {
      params: {
        ...keyValueParams,
        limit,
        offset,
      },
    });
    return { data };
  },
  examplePayload: {
    data: listEnvelopesResponse,
  },
});
