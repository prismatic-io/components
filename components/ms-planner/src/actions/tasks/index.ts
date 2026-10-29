import { assignTask } from "./assignTask";
import { completeTask } from "./completeTask";
import { createTask } from "./createTask";
import { deleteTask } from "./deleteTask";
import { getTask } from "./getTask";
import { getTaskDetails } from "./getTaskDetails";
import { listTasksForUser } from "./listTasksForUser";
import { listTasksInBucket } from "./listTasksInBucket";
import { listTasksInPlan } from "./listTasksInPlan";
import { moveTaskToBucket } from "./moveTaskToBucket";
import { updateTask } from "./updateTask";
import { updateTaskDetails } from "./updateTaskDetails";
export default {
  listTasksInPlan,
  listTasksInBucket,
  listTasksForUser,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTaskDetails,
  updateTaskDetails,
  completeTask,
  assignTask,
  moveTaskToBucket,
};
