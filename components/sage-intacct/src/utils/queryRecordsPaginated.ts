import { Functions } from "@intacct/intacct-sdk";
import { executeAction } from "./index";
import type { Connection } from "@prismatic-io/spectral";

export const queryRecordsPaginated = async (
  connection: Connection,
  objectNameInput: string,
  fieldsInput: string[],
  queryInput: string,
) => {
  const queryAndList = new Functions.Common.ReadByQuery();
  queryAndList.objectName = objectNameInput;
  queryAndList.fields = fieldsInput;

  if (queryInput.length > 0) queryAndList.query = queryInput;

  const data = [];
  const result = await executeAction(connection, queryAndList);

  data.push(...result.data);
  const resultId = result.resultId;

  let numRemaining = result.numRemaining;
  while (numRemaining > 0 && resultId != null) {
    const more = new Functions.Common.ReadMore();
    more.resultId = resultId;

    const resultMore = await executeAction(connection, more);
    data.push(...resultMore.data);
    numRemaining = resultMore.numRemaining;
  }
  return data;
};
