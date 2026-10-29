import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectCandidateExamplePayload } from "../examplePayloads";
import { selectCandidateInputs } from "../inputs";
import { paginateData } from "../util";

export const selectCandidate = dataSource({
  display: {
    label: "Select Candidate",
    description: "A picklist of candidates in SAP SuccessFactors.",
  },
  inputs: selectCandidateInputs,
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, false);
    const data = await paginateData(client, "/Candidate", true, {});
    const result = (data as Record<string, unknown>[]).map<Element>(
      (candidate) => ({
        label: `${candidate.firstName} ${candidate.lastName}`,
        key: candidate.candidateId as string,
      }),
    );
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectCandidateExamplePayload,
});
