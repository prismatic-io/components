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
    { connection, contactInfo, candidateId, compensation, additionalFields },
  ) => {
    const client = createClient(
      connection,
      API_VERSION.V1,
      context.debug.enabled,
    );
    const { data } = await client.post("/ats_candidates/push_candidate", {
      name: contactInfo.name,
      email: contactInfo.email,
      phoneNumber: contactInfo.phoneNumber,
      jobTitle: additionalFields.jobTitle,
      candidateId,
      startDate: additionalFields.startDate,
      department: additionalFields.department,
      salaryUnit: compensation.salaryUnit,
      salaryPerUnit: compensation.salaryPerUnit,
      signingBonus: compensation.signingBonus,
      equityShares: compensation.equityShares,
      currency: compensation.currency,
      employmentType: additionalFields.employmentType,
      attachments: additionalFields.attachments,
    });
    return { data };
  },
});
export default {
  postAtsCandidatesPushCandidate,
};
