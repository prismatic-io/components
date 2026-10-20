import { $filter, aoid, connection } from "./common";
export const selectPersonalContactInputs = {
  aoid: {
    ...aoid,
    dataSource: undefined,
  },
  connection,
};
export const selectWorkerInputs = {
  $filter: {
    ...$filter,
    comments:
      "Specifies an OData expression a worker must match to be listed. Leave blank to list every worker.",
    placeholder: "Enter filter expression",
    example: "workers/workerStatus/statusCode/codeValue eq 'Active'",
  },
  connection,
};
