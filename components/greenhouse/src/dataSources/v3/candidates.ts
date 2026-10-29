import { dataSource, type Element } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { candidatesV3DataSourceExamplePayload } from "../../examplePayloads/v3/dataSources";
import { connectionOnlyInputs } from "../../inputs/v3/common";
import type { V3Candidate } from "../../types";
import { fetchAllV3 } from "../../util/v3";

export const candidatesV3 = dataSource({
  display: {
    label: "Fetch Candidate Names",
    description: "Fetches an array of candidate names.",
  },
  inputs: connectionOnlyInputs,
  perform: async (_context, { connection }) => {
    const client = createV3Client(connection);
    const data = await fetchAllV3<V3Candidate>(client, "/candidates");
    const result = data.map<Element>((candidate) => ({
      label: `${candidate.first_name} ${candidate.last_name}`,
      key: candidate.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: candidatesV3DataSourceExamplePayload,
});
