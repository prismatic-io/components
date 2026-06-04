import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTimeOffRequestsExamplePayload } from "../../examplePayloads";
import { connectionInput, fetchAll, from, page, to } from "../../inputs";
import { fetchAllRecords } from "../../util";

export const listTimeOffRequests = action({
  display: {
    label: "List Time Off Requests",
    description: "Lists employee time off Requests",
  },
  inputs: {
    connectionInput,
    from,
    to,
    fetchAll,
    page,
  },
  perform: async (context, { connectionInput, fetchAll, page, from, to }) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const params = {
      from: from || undefined,
      to: to || undefined,
    };

    if (fetchAll) {
      const data = await fetchAllRecords(
        client,
        "/leave-management/requests",
        params,
      );
      return { data };
    }

    const { data } = await client.get("/leave-management/requests", {
      params: { ...params, page: page || undefined },
    });
    return { data };
  },
  examplePayload: listTimeOffRequestsExamplePayload,
});
