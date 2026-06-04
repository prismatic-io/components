import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../../client";
import {
  companyId,
  connectionInput,
  includetotalcount,
  pagenumber,
  pagesize,
} from "../../inputs";
import { fetchEmployees } from "../../util";

export const listEmployees = action({
  display: {
    label: "List Employees",
    description:
      "Get All Employees API will return employee data currently available in Web Pay.",
  },
  inputs: {
    connectionInput,
    companyId,
    pagesize,
    pagenumber,
    includetotalcount,
  },
  perform: async (
    context,
    { connectionInput, companyId, includetotalcount, pagenumber, pagesize },
  ) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const employees = await fetchEmployees(
      client,
      companyId,
      pagesize,
      pagenumber,
      includetotalcount,
    );
    return {
      data: employees,
    };
  },
});
