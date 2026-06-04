import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectCandidateExamplePayload } from "../examplePayloads/dataSources";
import { connection } from "../inputs/general";
import { paginateData } from "../util";

export const selectCandidate = dataSource({
  display: {
    label: "Select Candidate",
    description: "Select a Candidate from the dropdown list",
  },
  inputs: {
    connection,
  },
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const data = await paginateData(client, "/Candidate", true, {});
    const result = (data as Record<string, unknown>[]).map<Element>((candidate) => ({
      label: `${candidate.firstName} ${candidate.lastName}`,
      key: candidate.candidateId as string,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectCandidateExamplePayload,
});
