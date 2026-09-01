import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll, pagination, serviceDeskId } from "./common";
const queueId = input({
  label: "Queue ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier of the queue. Use the List Queues action or the Queue data source.",
  placeholder: "Enter queue ID",
  example: "3",
  dataSource: "selectQueue",
  clean: util.types.toString,
});
export const listQueuesInputs = {
  connection,
  serviceDeskId,
  fetchAll,
  pagination,
};
export const listQueueIssuesInputs = {
  connection,
  serviceDeskId,
  queueId,
  fetchAll,
  pagination,
};
