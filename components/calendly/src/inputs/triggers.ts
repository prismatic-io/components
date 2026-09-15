import {
  connection,
  eventNamesInput,
  lookBackDate,
  organization,
  scope,
  showNewRecords,
  showUpdatedRecords,
  signingKey,
  user,
} from "./common";
export const calendlyTriggerInputs = {
  connection,
  organization: {
    ...organization,
    required: true,
    comments:
      "The unique reference to the organization that the webhook will be tied to.",
  },
  user: {
    ...user,
    required: false,
    comments:
      "The unique reference to the user that the webhook will be tied to.",
  },
  eventNamesInput,
  scope,
  signingKey,
};
export const pollChangesTriggerInputs = {
  connection,
  organization: {
    ...organization,
    required: true,
    dataSource: "organizations",
    comments: "Poll events scheduled with the organization at this URI.",
  },
  user,
  lookBackDate,
  showNewRecords,
  showUpdatedRecords,
};
