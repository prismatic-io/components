import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClassicClient } from "../client";
import { selectAssetGroupExamplePayload } from "../examplePayloads";
import { selectAssetGroupInputs } from "../inputs";
import type { AssetGroupResponse } from "../types";
import { ensureArray, parseXml, sortByLabel } from "../util";
export const selectAssetGroup = dataSource({
  examplePayload: selectAssetGroupExamplePayload,
  display: {
    label: "Select Asset Group",
    description:
      "Fetch asset groups from Qualys for use in dropdown selectors (e.g., scan targeting).",
  },
  dataSourceType: "picklist",
  inputs: selectAssetGroupInputs,
  perform: async (_context, { connection }) => {
    const client = createClassicClient(connection, false);
    const response = await client.get<string>(
      "/api/2.0/fo/asset/group/?action=list",
    );
    const parsed = await parseXml<AssetGroupResponse>(response.data);
    const groups = ensureArray(
      parsed.ASSET_GROUP_LIST_OUTPUT?.RESPONSE?.ASSET_GROUP_LIST?.ASSET_GROUP,
    );
    const elements = groups.map<Element>((g) => ({
      key: g.ID || "",
      label: g.TITLE || g.ID || "Unnamed",
    }));
    return { result: sortByLabel(elements) };
  },
});
