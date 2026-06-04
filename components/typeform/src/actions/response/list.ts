import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  commonListInputs,
  connection,
  customQueryParams,
  formId,
} from "../../inputs";
import { fetchAllData } from "../../util";
import { listResponsesPayload } from "../../examplePayloads/responses";
import type { Response } from "../../interfaces/responses";

export const listResponses = action({
  display: {
    label: "List Responses",
    description:
      "Returns form responses and date and time of form landing and submission.",
  },
  inputs: {
    id: formId,
    ...commonListInputs,
    customQueryParams,
    connection,
  },
  perform: async (
    context,
    { connection, id, customQueryParams, fetchAll, page, pageSize, search },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await fetchAllData<Response>(
      client,
      `/forms/${id}/responses`,
      {
        search,
        page,
        page_size: pageSize,
        ...customQueryParams,
      },
      fetchAll,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listResponsesPayload,
  },
});
