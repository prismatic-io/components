import type { ChangeLifecycleTransitionFullVo, UserCompactVo } from "../types";
const sampleUser: UserCompactVo = {
  guid: "9ZY87XW65VU43TS21RQ09PO8",
  fullName: "Jordan Rivera",
  email: "jordan.rivera@example.com",
};
export const changeLifecycleStatusExamplePayload: {
  data: ChangeLifecycleTransitionFullVo;
} = {
  data: {
    change: {
      guid: "5AB12CD34EF56GH78IJ90KL1",
      number: "ECO-000512",
      url: {
        api: "https://api.arenasolutions.com/v1/changes/5AB12CD34EF56GH78IJ90KL1",
        app: "https://app.bom.com/changes/5AB12CD34EF56GH78IJ90KL1",
      },
    },
    status: "SUBMITTED_FOR_APPROVAL",
    implStatus: {
      guid: "2IS33IS44IS55IS66IS77IS8",
      value: "IN_PROGRESS",
    },
    comment: "Submitting change for approval after engineering review.",
    administrators: [sampleUser],
  },
};
