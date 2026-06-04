import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { API_VERSION } from "../../constants";
import { postAtsCandidatesPushCandidateExamplePayload } from "../../examplePayloads";
import { postAtsCandidatesPushCandidateInputs } from "../../inputs";

const postAtsCandidatesPushCandidate = action({
  display: {
    label: "Post Ats Candidates Push Candidate (V1)",
    description: "POST New Candidate.",
  },
  inputs: postAtsCandidatesPushCandidateInputs,
  examplePayload: postAtsCandidatesPushCandidateExamplePayload,
  perform: async (
    context,
    {
      connection,
      name,
      email,
      phoneNumber,
      jobTitle,
      candidateId,
      startDate,
      department,
      salaryUnit,
      salaryPerUnit,
      signingBonus,
      equityShares,
      currency,
      employmentType,
      attachments,
    },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    const { data } = await client.post("/ats_candidates/push_candidate", {
      name,
      email,
      phoneNumber,
      jobTitle,
      candidateId,
      startDate,
      department,
      salaryUnit,
      salaryPerUnit,
      signingBonus,
      equityShares,
      currency,
      employmentType,
      attachments,
    });
    return { data };
  },
});

export default {
  postAtsCandidatesPushCandidate,
};
