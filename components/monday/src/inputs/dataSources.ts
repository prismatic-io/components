import { boardId, connectionInput } from "./common";
export const selectBoardInputs = {
  connection: connectionInput,
};
export const selectWebhookInputs = {
  connection: connectionInput,
  boardId: {
    ...boardId,
    dataSource: undefined,
  },
};
