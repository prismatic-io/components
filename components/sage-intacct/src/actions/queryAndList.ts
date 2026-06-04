import { action } from "@prismatic-io/spectral";
import {
  connection,
  fieldsInput,
  objectNameInput,
  queryInput,
} from "../inputs";
import { queryRecordsPaginated } from "../utils";
import { queryAndListPayload } from "../examplePayloads/queryAndListPayload";

export const queryAndList = action({
  display: {
    label: "Query and List Records",
    description: "Lists specified criteria based on a query.",
  },
  perform: async (
    _context,
    { connection, fieldsInput, objectNameInput, queryInput },
  ) => {
    const data = await queryRecordsPaginated(
      connection,
      objectNameInput,
      fieldsInput,
      queryInput,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    fieldsInput,
    objectNameInput,
    queryInput,
  },
  examplePayload: queryAndListPayload,
});
