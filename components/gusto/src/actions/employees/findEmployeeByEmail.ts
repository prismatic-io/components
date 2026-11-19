import {
  PerformSafety,
  action,
  outputSchema,
  util,
} from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { FIND_EMPLOYEE_PAGE_SIZE } from "../../constants";
import { findEmployeeByEmailExamplePayload } from "../../examplePayloads";
import { findEmployeeByEmailInputs } from "../../inputs";
import { findEmployeeByEmailOutputSchema } from "../../outputSchemas";

export const findEmployeeByEmail = action({
  display: {
    label: "Find Employee by Email",
    description: "Gets an employee by personal email address.",
  },
  inputs: findEmployeeByEmailInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: findEmployeeByEmailOutputSchema,
  }),
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    let page = 1;
    let hasMorePages = true;
    do {
      const { data: employees, headers } = await client.get<
        { email: string; [key: string]: unknown }[]
      >(`/companies/${params.companyId}/employees`, {
        params: { page, per: FIND_EMPLOYEE_PAGE_SIZE },
      });
      for (const employee of employees) {
        if (employee.email === params.email) {
          return {
            data: {
              data: employee as (typeof findEmployeeByEmailExamplePayload)["data"]["data"],
              headers: headers as Record<string, string>,
            },
          };
        }
      }
      hasMorePages =
        util.types.toNumber(headers["x-total-pages"]) >
        util.types.toNumber(headers["x-page"]);
      page += 1;
    } while (hasMorePages);
    throw new Error("Employee not found");
  },
  performSafety: PerformSafety.NOT_ALLOWED,
  examplePayload: findEmployeeByEmailExamplePayload,
});
