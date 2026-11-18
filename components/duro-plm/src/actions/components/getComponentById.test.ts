import { invoke } from "@prismatic-io/spectral/dist/testing";
import { ClientError } from "graphql-request";
import { getComponentByIdExamplePayload } from "../../examplePayloads";
import { useGraphqlServer } from "../../testHelpers";
import { getComponentById } from "./getComponentById";

const server = useGraphqlServer();
const componentId = getComponentByIdExamplePayload.data.componentsByIds[0].id;

describe("getComponentById", () => {
  test("sends the ID as a one-item ids list and returns the response", async () => {
    server.reply({ data: getComponentByIdExamplePayload.data });

    const { result } = await invoke(getComponentById, {
      connection: server.connection(),
      componentId,
    });

    expect(result).toEqual(getComponentByIdExamplePayload);
    expect(server.requests[0].body.variables).toEqual({ ids: [componentId] });
  });

  test("throws a ClientError carrying the status when Duro replies 500", async () => {
    server.reply({ message: "Internal Server Error" }, 500);

    const error = await invoke(getComponentById, {
      connection: server.connection(),
      componentId,
    }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ClientError);
    expect((error as ClientError).response.status).toBe(500);
  });
});
