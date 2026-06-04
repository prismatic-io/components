import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listPersonalContactsResponse } from "../../examplePayloads";
import { $select, aoid, connection } from "../../inputs";

export const listPersonalContacts = action({
  display: {
    label: "List Personal Contacts",
    description: "Returns a list of a worker’s personal contacts.",
  },
  inputs: {
    aoid,
    $select,
    connection,
  },
  perform: async (context, { connection, $select, aoid }) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get(
      `/hr/v2/associates/${aoid}/personal-contacts`,
      {
        params: {
          $select,
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listPersonalContactsResponse,
  },
});
