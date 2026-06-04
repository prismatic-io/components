import { dataSource, input } from "@prismatic-io/spectral";
import type { ListDataSetsQueryParams } from "../actions/types/ListDataSetsQueryParams";
import { getDomoClient } from "../client";
import { connection, limit, offset } from "../inputs";

const selectDataSet = dataSource({
  display: {
    label: "Select DataSet",
    description: "Selects a Domo DataSet.",
  },
  dataSourceType: "picklist",
  perform: async (_context, { connection, limit, offset }) => {
    const client = await getDomoClient(connection, false);
    const queryParams: ListDataSetsQueryParams = {};
    if (limit.length) queryParams.limit = limit;
    if (offset.length) queryParams.offset = offset;
    const { data } = await client.get(`/datasets`, {
      params: queryParams,
      headers: { Accept: "application/json" },
    });
    return {
      result: data
        .map((dataset: Record<string, string>) => ({
          label: dataset.name,
          key: dataset.id.toString(),
        }))
        .sort((a: { label: string }, b: { label: string }) =>
          a.label < b.label ? -1 : 1,
        ),
    };
  },
  inputs: {
    connection,
    limit: input({
      ...limit,
      required: false,
      comments:
        "The amount of DataSets to return in the list. The default is 50 and the maximum is 50.",
    }),
    offset: input({
      ...offset,
      required: false,
      comments:
        "The offset of the DataSet ID to begin list of DataSets within the response.",
    }),
  },
  examplePayload: {
    result: [{ label: "Leonhard Euler Birthday Bash", key: "1" }],
  },
});

export default { selectDataSet };
