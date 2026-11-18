import { invoke } from "@prismatic-io/spectral/dist/testing";
import { ClientError } from "graphql-request";
import {
  DEFAULT_LIBRARY_TYPE,
  N_FIRST_RESULTS_FALLBACK,
} from "../../constants";
import { listComponentsExamplePayload } from "../../examplePayloads";
import { useGraphqlServer } from "../../testHelpers";
import { listComponents } from "./listComponents";

const server = useGraphqlServer();

const componentsReply = {
  data: {
    components: {
      connection: {
        edges: listComponentsExamplePayload.data.map((node) => ({ node })),
      },
    },
  },
};

describe("listComponents", () => {
  test("returns the component nodes and sends the given first and libraryType", async () => {
    server.reply(componentsReply);

    const { result } = await invoke(listComponents, {
      connection: server.connection(),
      libraryType: "PERSONAL",
      first: 5,
    });

    expect(result).toEqual(listComponentsExamplePayload);
    expect(server.requests[0].body.variables).toEqual({
      first: 5,
      libraryType: "PERSONAL",
    });
  });

  test("falls back to the default first and libraryType when they are not provided", async () => {
    server.reply(componentsReply);

    await invoke(listComponents, {
      connection: server.connection(),
      libraryType: undefined,
      first: undefined,
    });

    expect(server.requests[0].body.variables).toEqual({
      first: N_FIRST_RESULTS_FALLBACK,
      libraryType: DEFAULT_LIBRARY_TYPE,
    });
  });

  test("throws a ClientError carrying the status when Duro replies 400", async () => {
    server.reply({ message: "Bad Request" }, 400);

    const error = await invoke(listComponents, {
      connection: server.connection(),
      libraryType: "GENERAL",
      first: 5,
    }).catch((e: unknown) => e);

    expect(error).toBeInstanceOf(ClientError);
    expect((error as ClientError).response.status).toBe(400);
  });
});
