import candidates from "./candidates";
import jobApplications from "./jobApplications";
import jobRequisitions from "./jobRequisitions";
import misc from "./misc";
import onboardingCandidate from "./onboardingCandidate";
import records from "./records";

export default {
  ...candidates,
  ...jobApplications,
  ...jobRequisitions,
  ...onboardingCandidate,
  ...records,
  ...misc,
};
