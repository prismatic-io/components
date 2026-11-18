import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listComponentsExamplePayload } from "../../examplePayloads";
import { useGraphqlServer } from "../../testHelpers";
import { selectComponent } from "./selectComponent";

const server = useGraphqlServer();

const componentsReply = (nodes: Array<{ id: string; name: string }>) => ({
  data: {
    components: { connection: { edges: nodes.map((node) => ({ node })) } },
  },
});

describe("selectComponent", () => {
  test("maps each component to a key/label element", async () => {
    server.reply(componentsReply(listComponentsExamplePayload.data));

    const result = await invokeDataSource(selectComponent, {
      connection: server.connection(),
      libraryType: "GENERAL",
      first: 10,
    });

    expect(result).toEqual({
      result: listComponentsExamplePayload.data.map(({ id, name }) => ({
        key: id,
        label: name,
      })),
    });
    expect(server.requests[0].body.variables).toEqual({
      first: 10,
      libraryType: "GENERAL",
    });
  });

  test("returns an empty result when the library has no components", async () => {
    server.reply(componentsReply([]));

    const result = await invokeDataSource(selectComponent, {
      connection: server.connection(),
      libraryType: "GENERAL",
      first: 10,
    });

    expect(result).toEqual({ result: [] });
  });
});
