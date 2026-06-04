import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../client";
import { selectProblemInputs as inputs } from "../inputs/dataSources";
import type { Problem } from "../types/dataSourceTypes";
import { getListData } from "../util";

export const selectProblem = dataSource({
  display: {
    label: "Select Problem",
    description: "Select a problem from a list of problems.",
  },
  inputs,
  dataSourceType: "picklist",
  perform: async (_context, { connection }) => {
    const client = createFreshserviceClient(connection, false);

    const { data } = await getListData<Problem, "problems">(
      client,
      `/problems`,
      "problems",
      true,
      {},
    );

    const objects = (data.problems || []).map<Element>(({ id, subject }) => ({
      key: util.types.toString(id),
      label: subject,
    }));

    return { result: objects };
  },
});
