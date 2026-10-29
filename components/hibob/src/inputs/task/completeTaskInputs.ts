import { connection } from "../common";
import { taskId } from "./common";

export const completeTaskInputs = {
  connection,
  taskId: {
    ...taskId,
    comments: "The ID of the task to complete.",
  },
};
