import { connectionInput, groupIdInput, planIdInput } from "./common";

export const selectBucketInputs = {
  connection: connectionInput,
  planId: { ...planIdInput, dataSource: undefined },
};

export const selectGroupInputs = {
  connection: connectionInput,
};

export const selectPlanInputs = {
  connection: connectionInput,
  groupId: { ...groupIdInput, dataSource: undefined },
};

export const selectTaskInputs = {
  connection: connectionInput,
  planId: { ...planIdInput, dataSource: undefined },
};

export const selectUserInputs = {
  connection: connectionInput,
};
