import { type Element, dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { myConnectionField, version } from "../inputs";
import type { AdAccount } from "../types/AdAccount";
import { getPaginatedData } from "../util";

export const selectAdAccount = dataSource({
  display: {
    label: "Select Ad Account",
    description: "Select an ad account from the current user's ad accounts.",
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, false, params.version);
    const {
      data: { data },
    } = await getPaginatedData(client, "/me/adaccounts", true, {
      fields: "name,id",
    });

    const result: Element[] = data.map((adAccount: AdAccount) => ({
      label: `${adAccount.name} - (${adAccount.id})`,
      key: adAccount.id,
    }));

    return {
      result,
    };
  },
  dataSourceType: "picklist",
  inputs: {
    connection: myConnectionField,
    version,
  },
});
