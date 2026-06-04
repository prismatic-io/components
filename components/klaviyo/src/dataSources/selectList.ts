import { dataSource, type Element } from "@prismatic-io/spectral";
import { connection } from "../inputs/shared";
import { getApi } from "../api";
import { fetchLists } from "../utils";
import { KlaviyoApi } from "../enums/KlaviyoApi";

export const selectList = dataSource({
  display: {
    label: "Select List",
    description: "Select a list from your Klaviyo account.",
  },
  inputs: { connection },
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const listsApi = getApi(connection, KlaviyoApi.Lists);

    const data = await fetchLists(listsApi, ["name"], [], undefined);
    const result = data.data
      .map<Element>((response) => ({
        key: response.id,
        label: response.attributes.name ?? response.id,
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));

    return { result };
  },
  examplePayload: {
    result: [{ label: "Example List", key: "RE83th" }],
  },
});
