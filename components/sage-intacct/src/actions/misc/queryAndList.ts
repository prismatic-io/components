import { action, outputSchema } from "@prismatic-io/spectral";
import { queryRecordsPaginated } from "../../util";
import { queryAndListExamplePayload } from "../../examplePayloads";
import { queryAndListInputs } from "../../inputs";
import { queryAndListOutputSchema } from "../../outputSchemas";
export const queryAndList = action({
  display: {
    label: "Query and List Records",
    description: "Lists specified criteria based on a query.",
  },
  performSafety: "notAllowed",
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
  inputs: queryAndListInputs,
  examplePayload: queryAndListExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: queryAndListOutputSchema,
  }),
  examplePerform: async () => ({ data: queryAndListExamplePayload.data }),
});
