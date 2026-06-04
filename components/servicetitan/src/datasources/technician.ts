import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { techniciansDatasource } from "../examplePayloads";
import { connection } from "../inputs";
import type { Technician } from "../interfaces";

export const selectTechnician = dataSource({
  display: {
    label: "Select Technician",
    description:
      "Select a Technician from a dropdown menu (up to 10,000 Technicians)",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, "settings");
    let technicians: Technician[] = [];
    let cursor = false;
    let page = 1;

    do {
      const { data } = await client.get(`/technicians`, {
        params: {
          includeTotal: true,
          page,
          pageSize: 1000,
        },
      });
      technicians = [...technicians, ...data.data];
      cursor = data.hasMore;
      page++;
    } while (cursor && page < 10);

    
    const objects = technicians
      .sort((a, b) => (a.id < b.id ? -1 : 1))
      .map<Element>((technician) => ({
        key: technician.id.toString(),
        label: `${technician.name} (ID: ${technician.id})`,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: techniciansDatasource,
  },
});
