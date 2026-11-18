import { action, outputSchema } from "@prismatic-io/spectral";
import { createDuroClient } from "../../client";
import { gql } from "graphql-request";
import { listCompanyUsersInputs } from "../../inputs/company";
import { listCompanyUsersExamplePayload } from "../../examplePayloads";
import { listCompanyUsersOutputSchema } from "../../outputSchemas";

export const listCompanyUsers = action({
  display: {
    label: "List Company Users",
    description:
      "Retrieves account information for each user in the company library.",
  },
  inputs: listCompanyUsersInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection }) => {
    const client = createDuroClient(
      connection,
      context.debug.enabled,
      context.logger,
    );
    const query = gql`
      query UserById {
        userById {
          primaryCompany {
            id
            name
            users {
              email
              id
              firstName
              lastName
              created
              role
              title
              lastLogin
            }
          }
        }
      }
    `;
    const data = await client.request(query);
    return {
      data: (data as Record<string, Record<string, unknown>>).userById
        .primaryCompany,
    };
  },
  examplePerform: async () => listCompanyUsersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCompanyUsersOutputSchema,
  }),
  examplePayload: listCompanyUsersExamplePayload,
});
