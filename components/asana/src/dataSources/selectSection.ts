import { dataSource } from "@prismatic-io/spectral";
import { createAsanaClient } from "../client";
import { selectSectionInputs } from "../inputs";
import type { DataSource } from "../types/Project";
import { fetchMoreData, mapToLabelKey } from "../util";
const selectSection = dataSource({
  display: {
    label: "Select Section",
    description: "Select a section from a dropdown menu.",
  },
  inputs: selectSectionInputs,
  perform: async (_context, { connection, projectId }) => {
    const client = await createAsanaClient(connection, false);
    const data = await fetchMoreData<DataSource>(
      client,
      `/projects/${projectId}/sections`,
      [],
      true,
    );
    const result = mapToLabelKey(data);
    return { result };
  },
  dataSourceType: "picklist",
});
export default {
  selectSection,
};
