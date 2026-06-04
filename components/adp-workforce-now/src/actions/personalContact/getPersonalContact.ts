import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonalContactsResponse } from "../../examplePayloads";
import { $select, aoid, connection, personalContactId } from "../../inputs";

export const getPersonalContact = action({
  display: {
    label: "Get Personal Contact",
    description: "Returns a personal contact",
  },
  inputs: {
    aoid,
    personalContactId,
    $select,
    connection,
  },
  perform: async (
    context,
    { connection, $select, aoid, personalContactId },
  ) => {
    const axiosClient = await createClient(
      context,
      connection,
      context.debug.enabled,
    );
    const { data } = await axiosClient.get(
      `/hr/v2/associates/${aoid}/personal-contacts/${personalContactId}`,
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
    data: getPersonalContactsResponse,
  },
});
