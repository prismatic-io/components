import { SUCCESS_EMPTY_PAYLOAD } from "../constants";
export const createDeploymentOutputSchema = {
  type: "string" as const,
  enum: [SUCCESS_EMPTY_PAYLOAD],
};
