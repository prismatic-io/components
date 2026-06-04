import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  adAccountId,
  after,
  before,
  fetchAll,
  fields,
  limit,
  myConnectionField,
  version,
} from "../inputs";
import { adSetDefaults, getPaginatedData } from "../util";

export const listAdSetsInAccount = action({
  display: {
    label: "List Ad Sets In Account",
    description: "List all ad sets in an ad account.",
  },
  perform: async (
    context,
    {
      version,
      connection,
      adAccountId,
      fetchAll,
      limit,
      before,
      after,
      fields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);

    const { data } = await getPaginatedData(
      client,
      `/${adAccountId}/adsets`,
      fetchAll,
      {
        limit,
        before,
        after,
        fields,
      },
    );

    return {
      data,
    };
  },
  inputs: {
    connection: myConnectionField,
    adAccountId,
    fetchAll,
    limit,
    before,
    after,
    fields: { ...fields, default: adSetDefaults },
    version,
  },
});
