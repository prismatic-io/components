import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listProblemsDatasource as examplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";
import type { Problem } from "../interfaces";
import { paginateData } from "../util";

export const selectProblem = dataSource({
  display: {
    label: "Select Problem",
    description: "Select a problem from the list of problems.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const data = await paginateData(
      client,
      "problems",
      undefined,
      undefined,
      true,
      undefined,
    );
    const result = (data.problems as Problem[]).map<Element>((problem) => ({
      label: problem.title,
      key: problem.id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload,
});
