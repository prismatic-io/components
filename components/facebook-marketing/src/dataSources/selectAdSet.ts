import { type Element, dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { adAccountId, myConnectionField, version } from "../inputs";
import { getPaginatedData } from "../util";

export const selectAdSet = dataSource({
  display: {
    label: "Select Ad Set",
    description: "Select an ad set in the provided ad account.",
  },
  perform: async (_context, params) => {
    const client = createClient(params.connection, false, params.version);
    const {
      data: { data },
    } = await getPaginatedData(client, `/${params.adAccountId}/adsets`, true, {
      fields: "name,id",
    });

    const result: Element[] = data
      .map((adSet: { name: string; id: string }) => ({
        label: `${adSet.name} - (${adSet.id})`,
        key: adSet.id.toString(),
      }))
      .sort((a: Element, b: Element) => (a.label < b.label ? -1 : 1));

    return {
      result,
    };
  },
  dataSourceType: "picklist",
  inputs: {
    adAccountId: {
      ...adAccountId,
      dataSource: undefined,
    },
    connection: myConnectionField,
    version,
  },
  examplePayload: {
    result: [
      { label: "My Ad Set - (23849551358310668)", key: "23849551358310668" },
    ],
  },
});
