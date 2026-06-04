import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection } from "../inputs";

export const getBulkSendLists = action({
  display: {
    label: "Get Bulk Send Lists",
    description:
      "This method returns a list of bulk send lists belonging to the current user, as well as basic information about each list.",
  },
  perform: async (context, { connection }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/bulk_send_lists`);
    return { data };
  },
  inputs: {
    connection,
  },
});
