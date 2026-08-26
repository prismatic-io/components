import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClassicClient } from "../client";
import { selectScannerApplianceExamplePayload } from "../examplePayloads";
import { selectScannerApplianceInputs } from "../inputs";
import type { ScannerApplianceResponse } from "../types";
import { ensureArray, parseXml, sortByLabel } from "../util";
export const selectScannerAppliance = dataSource({
  examplePayload: selectScannerApplianceExamplePayload,
  display: {
    label: "Select Scanner Appliance",
    description:
      "Fetch scanner appliances from Qualys for use in dropdown selectors. Required when launching a VM scan against targets not covered by Cloud Agent.",
  },
  dataSourceType: "picklist",
  inputs: selectScannerApplianceInputs,
  perform: async (_context, { connection }) => {
    const client = createClassicClient(connection, false);
    const response = await client.get<string>(
      "/api/2.0/fo/appliance/?action=list",
    );
    const parsed = await parseXml<ScannerApplianceResponse>(response.data);
    const appliances = ensureArray(
      parsed.APPLIANCE_LIST_OUTPUT?.RESPONSE?.APPLIANCE_LIST?.APPLIANCE,
    );
    const elements = appliances.map<Element>((a) => ({
      key: a.ID || "",
      label: `${a.NAME || "Unnamed"}${a.STATUS ? ` (${a.STATUS})` : ""}`,
    }));
    return { result: sortByLabel(elements) };
  },
});
