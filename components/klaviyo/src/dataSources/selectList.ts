import { dataSource, type Element } from "@prismatic-io/spectral";
import { selectListInputs } from "../inputs";
import { selectListExamplePayload } from "../examplePayloads";
import { getApi } from "../api";
import { fetchLists } from "../util";
import { KlaviyoApi } from "../constants";
export const selectList = dataSource({
  display: {
    label: "Select List",
    description: "Select a list from a Klaviyo account.",
  },
  inputs: selectListInputs,
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
  examplePayload: selectListExamplePayload,
});
