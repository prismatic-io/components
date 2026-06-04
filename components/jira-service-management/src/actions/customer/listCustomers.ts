import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { listCustomersInputs } from "../../inputs";
import type { User } from "../../types";
import { getPaginatedData } from "../../util";

export const listCustomers = action({
  display: {
    label: "List Customers",
    description: "Returns customers associated with a service desk.",
  },
  inputs: listCustomersInputs,
  perform: async (
    context,
    { connection, serviceDeskId, start, limit, fetchAll },
  ) => {
    const { client } = await createClient(
      connection,
      context.debug.enabled,
      true,
    );
    const { data } = await getPaginatedData<User>(
      client,
      `/servicedesk/${serviceDeskId}/customer`,
      fetchAll,
      { params: { start, limit } },
    );
    return { data };
  },
  examplePayload: listCustomersExamplePayload,
});
