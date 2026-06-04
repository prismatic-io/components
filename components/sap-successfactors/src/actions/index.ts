import candidates from "./candidates";
import jobApplications from "./jobApplications";
import jobRequisitions from "./jobRequisitions";
import onboardingCandidate from "./onboardingCandidate";
import rawRequest from "./rawRequest";
import records from "./records";

export default {
  ...candidates,
  ...jobApplications,
  ...jobRequisitions,
  ...onboardingCandidate,
  ...records,
  rawRequest,
};
