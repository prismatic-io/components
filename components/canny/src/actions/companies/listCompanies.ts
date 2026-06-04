import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCompaniesExamplePayload } from "../../examplePayloads";
import { listCompaniesInputs } from "../../inputs";
import { paginateCursor } from "../../util";

export const listCompanies = action({
  display: {
    label: "List Companies",
    description: "Lists companies with cursor-based pagination.",
  },
  inputs: listCompaniesInputs,
  perform: async (
    context,
    { connection, companySearch, segment, fetchAll, cursor, limit },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const data = await paginateCursor(
      client.postV2,
      "/companies/list",
      "companies",
      { search: companySearch, segment, cursor, limit },
      fetchAll,
    );
    return { data };
  },
  examplePayload: listCompaniesExamplePayload,
});
