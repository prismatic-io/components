import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { listAccountsExamplePayload as examplePayload } from "../../examplePayloads/accounts";
import {
  connectionInput,
  fetchAll,
  maxResults,
  startPosition,
} from "../../inputs";
import type { PaginatedDataRequest } from "../../types";
import { paginatedData } from "../../util";

export const listAccounts = action({
  display: {
    label: "List Accounts",
    description: "Retrieve a list of all Accounts.",
  },
  perform: async (
    context,
    { quickbooksConnection, fetchAll, startPosition, maxResults },
  ) => {
    const client = createHttpClient(
      quickbooksConnection,
      context.debug.enabled,
    );

    const request: PaginatedDataRequest = {
      client,
      queryString: "select * from Account",
      objectName: "Account",
      fetchAll,
      params: { startPosition, maxResults },
    };

    const data = await paginatedData(request);
    return {
      data,
    };
  },
  inputs: {
    fetchAll,
    maxResults,
    startPosition,
    quickbooksConnection: connectionInput,
  },
  examplePayload,
});
