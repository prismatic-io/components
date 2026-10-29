import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectRealmExamplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs/general";
import type { Realm } from "../interfaces/general";

export const selectRealm = dataSource({
  display: {
    label: "Select Realm",
    description: "A picklist of Realms in your Okta Org.",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const { data } = await client.get<Realm[]>("/realms");

    const result = data.map<Element>((realm) => ({
      label: realm.profile.name || realm.id,
      key: realm.id,
    }));

    return {
      result,
    };
  },
  examplePayload: selectRealmExamplePayload,
  dataSourceType: "picklist",
});
