import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectInstalledEquipmentExamplePayload } from "../examplePayloads";
import { selectInstalledEquipmentInputs } from "../inputs";
import type { InstalledEquipment } from "../types";
export const selectInstalledEquipment = dataSource({
  display: {
    label: "Select Installed Equipment",
    description:
      "Select an Installed Equipment from a dropdown menu (up to 10,000 Installed Equipments)",
  },
  inputs: selectInstalledEquipmentInputs,
  perform: async (_context, { connection }) => {
    const client = createClient(connection, "equipmentsystems");
    let installedEquipments: InstalledEquipment[] = [];
    let cursor = false;
    let page = 1;
    do {
      const { data } = await client.get(`/installed-equipment`, {
        params: {
          includeTotal: true,
          page,
          pageSize: 1000,
        },
      });
      installedEquipments = [...installedEquipments, ...data.data];
      cursor = data.hasMore;
      page++;
    } while (cursor && page < 10);
    const objects = installedEquipments
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((installedEquipment) => ({
        key: installedEquipment.id.toString(),
        label: `${installedEquipment.name} (ID: ${installedEquipment.id})`,
      }));
    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: selectInstalledEquipmentExamplePayload,
});
