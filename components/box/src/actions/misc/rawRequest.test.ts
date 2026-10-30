import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { stubAxiosAdapter } from "../../../tests/axiosAdapter";
import { apiKey } from "../../connections";
import { rawRequest } from "./rawRequest";

const TOKEN = "test-token-for-unit-tests";

const connection = createConnection(apiKey, { apiKey: TOKEN });

describe("rawRequest", () => {
  let http: ReturnType<typeof stubAxiosAdapter>;

  afterEach(() => http?.restore());

  test("forwards the request to the Box API root with the bearer token and returns the body untouched", async () => {
    const body = { type: "folder", id: "0", name: "All Files" };
    http = stubAxiosAdapter(() => ({ status: 200, data: body }));

    const { result } = await invoke(rawRequest, {
      connection,
      method: "GET",
      url: "/2.0/folders/0",
      responseType: "json",
      headers: [],
      queryParams: [],
    } as never);

    expect(result).toEqual({ data: body });
    expect(http.calls).toHaveLength(1);
    const [request] = http.calls;
    expect(request.method).toBe("get");
    expect(request.baseURL).toBe("https://api.box.com");
    expect(request.url).toBe("/2.0/folders/0");
    expect(request.headers.Authorization).toBe(`Bearer ${TOKEN}`);
  });
});
