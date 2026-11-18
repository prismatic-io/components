import { invoke } from "@prismatic-io/spectral/dist/testing";
import { ClientError } from "graphql-request";
import { N_FIRST_RESULTS_FALLBACK } from "../../constants";
import { listChangeOrdersExamplePayload } from "../../examplePayloads";
import { useGraphqlServer } from "../../testHelpers";
import { listChangeOrders } from "./listChangeOrders";

const server = useGraphqlServer();

describe("listChangeOrders", () => {
  test("sends first and orderBy and returns the response", async () => {
    server.reply({ data: listChangeOrdersExamplePayload.data });

    const { result } = await invoke(listChangeOrders, {
      connection: server.connection(),
      orderBy: [{ con: "asc" }],
      first: 3,
    });

    expect(result).toEqual(listChangeOrdersExamplePayload);
    expect(server.requests[0].body.variables).toEqual({
      first: 3,
      orderBy: [{ con: "asc" }],
    });
  });

  test("omits orderBy and sends the default first when neither is provided", async () => {
    server.reply({ data: listChangeOrdersExamplePayload.data });

    await invoke(listChangeOrders, {
      connection: server.connection(),
      orderBy: undefined,
      first: undefined,
    });

    expect(server.requests[0].body.variables).toEqual({
      first: N_FIRST_RESULTS_FALLBACK,
    });
  });

  test("throws a ClientError carrying the status when Duro replies 503", async () => {
    server.reply({ message: "Service Unavailable" }, 503);

    const error = await invoke(listChangeOrders, {
      connection: server.connection(),
      orderBy: undefined,
      first: 3,
    }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ClientError);
    expect((error as ClientError).response.status).toBe(503);
  });
});
