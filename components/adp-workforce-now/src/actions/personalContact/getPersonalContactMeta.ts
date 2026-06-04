import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonalContactMetaResponse } from "../../examplePayloads";
import { $select, aoid, connection } from "../../inputs";

export const getPersonalContactMeta = action({
  display: {
    label: "Get Personal Contact Meta",
    description: "Returns a personal contact metadata",
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
      `/hr/v2/associates/${aoid}/personal-contacts/meta`,
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
    data: getPersonalContactMetaResponse,
  },
});
