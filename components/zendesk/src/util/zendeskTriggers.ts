import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import type { ZendeskTrigger } from "../types";
export const fetchTriggers = async (
  client: HttpClient,
): Promise<ZendeskTrigger[]> => {
  let triggers: ZendeskTrigger[] = [];
  let after = null;
  let hasMore = false;
  do {
    const { data } = await client.get("/triggers", {
      params: { "page[after]": after },
    });
    triggers = [...triggers, ...data.triggers];
    hasMore = data.meta?.has_more;
    after = data.meta?.after_cursor;
  } while (hasMore);
  return triggers;
};
