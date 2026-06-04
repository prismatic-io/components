import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectServiceDeskExamplePayload } from "../examplePayloads";
import { selectServiceDeskInputs } from "../inputs";
import type { PagedResponse, ServiceDesk } from "../types";
import { getPaginatedData, toSortedPicklist } from "../util";



export const selectServiceDesk = dataSource({
  display: {
    label: "Select Service Desk",
    description: "Fetches all service desks and returns them as a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectServiceDeskInputs,
  perform: async (_context, { connection }) => {
    const { client } = await createClient(connection, false);
    const { data }: { data: PagedResponse<ServiceDesk> } =
      await getPaginatedData<ServiceDesk>(client, "/servicedesk", true);
    const result = toSortedPicklist(
      data.values,
      (d) => d.projectName,
      (d) => d.id,
    );
    return { result };
  },
  examplePayload: selectServiceDeskExamplePayload,
});
