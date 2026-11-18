import { invoke } from "@prismatic-io/spectral/dist/testing";
import { ClientError } from "graphql-request";
import { createChangeOrderExamplePayload } from "../../examplePayloads";
import { useGraphqlServer } from "../../testHelpers";
import { createChangeOrder } from "./createChangeOrder";

const server = useGraphqlServer();
const { name, description, type } =
  createChangeOrderExamplePayload.data.createChangeOrder;

describe("createChangeOrder", () => {
  test("sends name, description and type as the mutation input and returns the response", async () => {
    server.reply({ data: createChangeOrderExamplePayload.data });

    const { result } = await invoke(createChangeOrder, {
      connection: server.connection(),
      name,
      description,
      type,
    });

    expect(result).toEqual(createChangeOrderExamplePayload);
    expect(server.requests[0].body.query).toContain("createChangeOrder");
    expect(server.requests[0].body.variables).toEqual({
      input: { name, description, type },
    });
  });

  test("throws a ClientError with the GraphQL error message when Duro rejects the mutation", async () => {
    server.reply({ data: null, errors: [{ message: "Invalid change order" }] });

    const error = await invoke(createChangeOrder, {
      connection: server.connection(),
      name,
      description,
      type,
    }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ClientError);
    expect((error as ClientError).message).toContain("Invalid change order");
  });
});
