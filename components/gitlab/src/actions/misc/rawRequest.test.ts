import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { rawRequestInputs } from "../../inputs";
import { accessTokenConnection, GITLAB_URL } from "../../testHelpers";
import { rawRequest } from "./rawRequest";
afterEach(() => nock.cleanAll());
const cleaned = (raw: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(raw).map(([key, value]) => {
      const { clean } = rawRequestInputs[key as keyof typeof rawRequestInputs];
      return [key, clean ? (clean as (v: unknown) => unknown)(value) : value];
    }),
  );
const rawParams = (url: string) => ({
  url,
  method: "GET",
  data: "",
  queryParams: [{ key: "state", value: "opened" }],
  headers: [],
  responseType: "json",
  timeout: "",
});
test("Raw Request sends the path under /api/v4 with the access token", async () => {
  nock(GITLAB_URL, { reqheaders: { "PRIVATE-TOKEN": "glpat-test-token" } })
    .get("/api/v4/projects/1/issues")
    .query({ state: "opened" })
    .reply(200, [{ id: 1 }]);
  const { result } = await invoke(rawRequest, {
    connection: accessTokenConnection,
    ...cleaned(rawParams("/projects/1/issues")),
  } as never);
  expect(result?.data).toEqual([{ id: 1 }]);
});
test("Raw Request cleans blank optional inputs to undefined", () => {
  const params = cleaned(rawParams("/projects/1/issues"));
  expect(params.data).toBeUndefined();
  expect(params.timeout).toBeUndefined();
  expect(params.queryParams).toEqual({ state: "opened" });
  expect(params.headers).toEqual({});
});
test.each([
  "https://evil.example.com/api/v4/user",
  "//evil.example.com/api/v4/user",
  "HTTP://evil.example.com/user",
])("Raw Request rejects the absolute URL %s before sending anything", (url) => {
  expect(() => cleaned(rawParams(url))).toThrow(/relative to the GitLab API/);
});
