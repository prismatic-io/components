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
import { adCreativeDefaults, getPaginatedData } from "../util";

export const listAdCreatives = action({
  display: {
    label: "List Ad Creatives",
    description: "List all ad creatives in a given ad account.",
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
      `/${adAccountId}/adcreatives`,
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
    fields: { ...fields, default: adCreativeDefaults },
    version,
  },
});
