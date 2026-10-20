import {
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { webhook } from "./webhook";
const payloadWith = (headers: Record<string, string>) => ({
  ...defaultTriggerPayload(),
  headers,
});
test("routes by X-Gitlab-Event when no secret is configured", async () => {
  const { result } = await invokeTrigger(
    webhook,
    { isSimulatedTestExecution: false },
    payloadWith({ "X-Gitlab-Event": "Issue Hook" }),
    { secretToken: undefined },
  );
  expect(result?.branch).toBe("Issue");
});
test("rejects a mismatched token when a secret is configured", async () => {
  await expect(
    invokeTrigger(
      webhook,
      { isSimulatedTestExecution: false },
      payloadWith({ "X-Gitlab-Event": "Push Hook", "X-Gitlab-Token": "wrong" }),
      { secretToken: "right" },
    ),
  ).rejects.toThrow(/X-Gitlab-Token/);
});
test("accepts a matching token", async () => {
  const { result } = await invokeTrigger(
    webhook,
    { isSimulatedTestExecution: false },
    payloadWith({ "X-Gitlab-Event": "Push Hook", "X-Gitlab-Token": "right" }),
    { secretToken: "right" },
  );
  expect(result?.branch).toBe("Push");
  expect(result?.payload.headers).toEqual({ "X-Gitlab-Event": "Push Hook" });
});
test("a simulated test execution skips token verification even with a secret configured", async () => {
  const { result } = await invokeTrigger(
    webhook,
    { isSimulatedTestExecution: true },
    payloadWith({ "X-Gitlab-Event": "Merge Request Hook" }),
    { secretToken: "right" },
  );
  expect(result?.branch).toBe("Merge Request");
});
test("a simulated test execution also passes a wrong token through", async () => {
  const { result } = await invokeTrigger(
    webhook,
    { isSimulatedTestExecution: true },
    payloadWith({ "X-Gitlab-Event": "Push Hook", "X-Gitlab-Token": "wrong" }),
    { secretToken: "right" },
  );
  expect(result?.branch).toBe("Push");
});
