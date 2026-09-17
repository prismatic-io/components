import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../client";
import { selectSoftwareInputs as inputs } from "../inputs";
import type { SoftwareResponse } from "../types/dataSourceTypes";
export const selectSoftware = dataSource({
  display: {
    label: "Select Software",
    description: "Select software from a list of software applications.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const client = createFreshserviceClient(connection, { debug: false });
    const { data } = await client.get<SoftwareResponse>(`/applications`);
    const objects = (data.application ?? data.applications ?? []).map<Element>(
      ({ name, id }) => ({
        key: util.types.toString(id),
        label: name,
      }),
    );
    return { result: objects };
  },
});
