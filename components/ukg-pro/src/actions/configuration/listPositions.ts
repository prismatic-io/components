import { action } from "@prismatic-io/spectral";
import { createBasicAuthClient } from "../../client";
import { listPositionsExamplePayload } from "../../examplePayloads";
import { listPositionsInputs } from "../../inputs";
import type { EmployeePosition } from "../../types";
import { fetchWithPagination } from "../../util";







export const listPositions = action({
  display: {
    label: "List Positions",
    description: "Retrieve a list of positions defined in the organization.",
  },
  inputs: listPositionsInputs,
  perform: async (
    context,
    {
      connection,
      companyId,
      employeeType,
      payGroupCode,
      statusCode,
      positionCode,
      projectCode,
      shiftGroupCode,
      fetchAll,
      page,
      perPage,
      isProrated,
      isApproved,
      isElegibleForBenefits,
    },
  ) => {
    const client = createBasicAuthClient(connection, context.debug.enabled);

    const { data } = await fetchWithPagination<EmployeePosition>(
      client,
      "/configuration/v1/positions",
      {
        company: companyId,
        employeeType,
        payGroupCode,
        statusCode,
        positionCode,
        projectCode,
        shiftGroupCode,
        page,
        per_page: perPage,
        isProrated,
        isApproved,
        isElegibleForBenefits,
      },
      fetchAll,
    );

    return { data };
  },
  examplePayload: listPositionsExamplePayload,
});
