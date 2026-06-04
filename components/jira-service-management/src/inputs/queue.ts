import { input, util } from "@prismatic-io/spectral";
import { connection, fetchAll, limit, serviceDeskId, start } from "./common";

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
  start,
  limit,
};

export const listQueueIssuesInputs = {
  connection,
  serviceDeskId,
  queueId,
  fetchAll,
  start,
  limit,
};
