import { invoke } from "@prismatic-io/spectral/dist/testing";
import { ClientError } from "graphql-request";
import { listCompanyUsersExamplePayload } from "../../examplePayloads";
import { useGraphqlServer } from "../../testHelpers";
import { listCompanyUsers } from "./listCompanyUsers";

const server = useGraphqlServer();

describe("listCompanyUsers", () => {
  test("unwraps userById.primaryCompany into data", async () => {
    server.reply({
      data: {
        userById: { primaryCompany: listCompanyUsersExamplePayload.data },
      },
    });

    const { result } = await invoke(listCompanyUsers, {
      connection: server.connection(),
    });

    expect(result).toEqual(listCompanyUsersExamplePayload);
    expect(server.requests[0].body.query).toContain("primaryCompany");
  });

  test("throws a ClientError with the GraphQL error message when Duro returns errors", async () => {
    server.reply({ data: null, errors: [{ message: "Not authorized" }] });

    const error = await invoke(listCompanyUsers, {
      connection: server.connection(),
    }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ClientError);
    expect((error as ClientError).message).toContain("Not authorized");
  });
});
