import { MESSAGES } from "../constants";
import type { SuccessResponse } from "../interfaces/shared";

export const successEmptyExamplePayload: { data: SuccessResponse } = {
  data: { message: MESSAGES.SUCCESS },
};
