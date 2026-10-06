import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { clickUpApiKeyConnection } from "../../connections/clickUpApiKeyConnection";
import {
  createSpaceExamplePayload,
  updateSpaceExamplePayload,
} from "../../examplePayloads";
import { createSpace } from "./createSpace";
import { updateSpace } from "./updateSpace";
const API = "https://api.clickup.com";
const connection = createConnection(clickUpApiKeyConnection, {
  apiKey: "test-key",
});
interface Captured {
  body?: unknown;
  query?: Record<string, unknown>;
  headers?: Record<string, unknown>;
}
const mockClickUp = (
  method: string,
  path: string,
  status: number,
  reply: unknown,
): Captured => {
  const captured: Captured = {};
  nock(API)
    .intercept(`/api/v2${path}`, method, (body) => {
      captured.body = body;
      return true;
    })
    .query((query) => {
      captured.query = query;
      return true;
    })
    .reply(status, function () {
      captured.headers = this.req.headers;
      return reply as nock.Body;
    });
  return captured;
};
type ActionUnderTest = {
  inputs: Record<
    string,
    {
      type?: string;
    }
  >;
  perform: unknown;
};
const run = (action: ActionUnderTest, params: Record<string, unknown>) => {
  const connectionKey = Object.keys(action.inputs).find(
    (key) => action.inputs[key].type === "connection",
  ) as string;
  return invoke(
    action as any,
    { [connectionKey]: connection, ...params } as any,
  );
};
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  const consumed = nock.isDone();
  nock.cleanAll();
  expect(consumed).toBe(true);
});
const featureToggles = {
  multipleAssignees: true,
  enableDueDates: true,
  useStartDate: false,
  remapDueDates: true,
  remapClosedDueDates: false,
  enableTimeTracking: true,
  enableTags: false,
  enableTimeEstimates: true,
  enableChecklists: false,
  enableCustomFields: true,
  enableRemapDependencies: false,
  enableDependencyWarning: true,
  enablePortfolios: false,
};
const featureBody = {
  multiple_assignees: true,
  features: {
    due_dates: {
      enabled: true,
      start_date: false,
      remap_due_dates: true,
      remap_closed_due_date: false,
    },
    time_tracking: { enabled: true },
    tags: { enabled: false },
    time_estimates: { enabled: true },
    checklists: { enabled: false },
    custom_fields: { enabled: true },
    remap_dependencies: { enabled: false },
    dependency_warning: { enabled: true },
    portfolios: { enabled: false },
  },
};
describe("createSpace", () => {
  const params = {
    teamId: "9012345",
    spaceName: "Engineering",
    ...featureToggles,
  };
  test("happy path nests the feature toggles in the body and returns the response", async () => {
    const req = mockClickUp(
      "POST",
      "/team/9012345/space",
      200,
      createSpaceExamplePayload.data,
    );
    const { result } = await run(createSpace, params);
    expect(result).toEqual(createSpaceExamplePayload);
    expect(req.body).toEqual({ name: "Engineering", ...featureBody });
  });
});
describe("updateSpace", () => {
  const params = {
    spaceId: "790",
    spaceName: "Engineering",
    color: "#7B68EE",
    privateInput: false,
    adminCanManage: true,
    ...featureToggles,
  };
  test("happy path puts the space settings and returns the response", async () => {
    const req = mockClickUp(
      "PUT",
      "/space/790",
      200,
      updateSpaceExamplePayload.data,
    );
    const { result } = await run(updateSpace, params);
    expect(result).toEqual(updateSpaceExamplePayload);
    expect(req.body).toEqual({
      name: "Engineering",
      color: "#7B68EE",
      private: false,
      admin_can_manage: true,
      ...featureBody,
    });
  });
});
