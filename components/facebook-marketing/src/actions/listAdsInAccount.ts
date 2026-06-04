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
import { adDefaults, getPaginatedData } from "../util";

export const listAdsInAccount = action({
  display: {
    label: "List Ads In Account",
    description: "List all ads in an ad account.",
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
      `/${adAccountId}/ads`,
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
    before,
    after,
    limit,
    fields: { ...fields, default: adDefaults },
    version,
  },
});
