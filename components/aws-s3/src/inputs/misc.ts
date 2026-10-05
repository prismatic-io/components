import { dynamicAccessAllInputs } from "aws-utils";
import { accessKeyInput } from "./common";
export const getCurrentAccountInputs = {
  accessKey: accessKeyInput,
  ...dynamicAccessAllInputs,
};
