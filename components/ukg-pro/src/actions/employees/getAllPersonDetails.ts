import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { getAllPersonDetailsExamplePayload } from "../../examplePayloads";
import { getAllPersonDetailsInputs } from "../../inputs";
import type { EmployeeDetails } from "../../types";
import { fetchWithPagination } from "../../util";







export const getAllPersonDetails = action({
  display: {
    label: "Get All Person Details",
    description: "Retrieve person details for all employees across all companies.",
  },
  inputs: getAllPersonDetailsInputs,
  perform: async (context, { connection, filterParameters, fetchAll, page, perPage }) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await fetchWithPagination<EmployeeDetails>(
      client,
      "/personnel/v1/person-details",
      { ...filterParameters, page, per_page: perPage },
      fetchAll,
    );

    return { data };
  },
  examplePayload: getAllPersonDetailsExamplePayload,
});
