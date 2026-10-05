import { dynamicAccessAllInputs } from "aws-utils";
import { accessKeyInput } from "./common";
export const selectBucketInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
};
