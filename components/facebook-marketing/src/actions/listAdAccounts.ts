import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listAddAccountsResponse } from "../examplePayloads";
import {
  after,
  before,
  fetchAll,
  fields,
  limit,
  myConnectionField,
  version,
} from "../inputs";
import { adAccountDefaults, getPaginatedData } from "../util";

export const listAddAccounts = action({
  display: {
    label: "List Ad Accounts",
    description: "Get the ad accounts for the current user.",
  },
  perform: async (
    context,
    { version, connection, fetchAll, limit, before, after, fields },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await getPaginatedData(
      client,
      "/me/adaccounts",
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
    fetchAll,
    limit,
    before,
    after,
    fields: {
      ...fields,
      default: adAccountDefaults,
    },
    version,
  },
  examplePayload: listAddAccountsResponse,
});
